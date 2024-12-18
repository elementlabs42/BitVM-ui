import * as bitcoin from 'bitcoinjs-lib'
export const createPsbt = (rawTxHex: string, witnessUtxoHex: string, witnessScriptHex: string) => {
  const txDetails = bitcoin.Transaction.fromHex(rawTxHex)

  // Extract inputs
  const inputs = txDetails.ins.map((input) => {
    return {
      txid: Buffer.from(input.hash).reverse().toString('hex'),
      vout: input.index,
      scriptSig: Buffer.from(input.script).toString('hex'),
      sequence: input.sequence,
    }
  })

  const outputs = txDetails.outs.map((output) => {
    return {
      value: output.value,
      scriptPubKey: Buffer.from(output.script).toString('hex'),
    }
  })

  // Create a new PSBT
  const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet })

  // Add inputs
  inputs.forEach((input) => {
    const txid = input.txid
    const nonWitnessUtxo = Buffer.from(witnessUtxoHex, 'hex')
    const witnessScript = Buffer.from(witnessScriptHex, 'hex')

    psbt.addInput({
      hash: txid,
      index: input.vout,
      sequence: input.sequence,
      nonWitnessUtxo: new Uint8Array(nonWitnessUtxo),
      witnessScript: new Uint8Array(witnessScript),
    })
  })

  // Add outputs
  outputs.forEach((output) => {
    const scriptPubKey = Buffer.from(output.scriptPubKey, 'hex')

    psbt.addOutput({
      script: new Uint8Array(scriptPubKey),
      value: output.value,
    })
  })

  return psbt.toHex()
}

export const hexToBase64 = (hexStr: string) => {
  //@ts-ignore
  const byteArray = new Uint8Array(hexStr.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)))
  // Convert byte array to Base64
  const base64Val = Buffer.from(byteArray).toString('base64')
  return base64Val
}

export const finalizePsbtAndGetTxId = (psbtHex: string) => {
  try {
    const psbt = bitcoin.Psbt.fromBase64(hexToBase64(psbtHex))

    // Exploring individual components of the PSBT
    console.log("Inputs:");
    psbt.data.inputs.forEach((input, index) => {
      console.log(`Input ${index}:`, input);
    });

    console.log("Outputs:");
    psbt.data.outputs.forEach((output, index) => {
      console.log(`Output ${index}:`, output);
    })
    const tx = psbt.extractTransaction()
    return tx.getId()
  } catch (error) {
    console.error("Failed to decode PSBT:", error);
  }
}
