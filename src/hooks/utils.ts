import * as bitcoin from 'bitcoinjs-lib';


export const createPsbt = (rawTxHex: string, witnessUtxoHex: string, witnessScriptHex: string) => {
    const txDetails = bitcoin.Transaction.fromHex(rawTxHex);

    // Extract inputs
    const inputs = txDetails.ins.map(input => {
        return {
            txid: Buffer.from(input.hash).reverse().toString('hex'),
            vout: input.index,
            scriptSig: Buffer.from(input.script).toString('hex'),
            sequence: input.sequence
        };
    });

    const outputs = txDetails.outs.map(output => {
        return {
            value: output.value,
            scriptPubKey: Buffer.from(output.script).toString('hex')
        };
    });

    // Create a new PSBT
    const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet });

    // Add inputs
    inputs.forEach(input => {
        const txid = input.txid
        const nonWitnessUtxo = Buffer.from(witnessUtxoHex, 'hex');
        const witnessScript = Buffer.from(witnessScriptHex, 'hex');

        psbt.addInput({
            hash: txid,
            index: input.vout,
            sequence: input.sequence,
            nonWitnessUtxo: new Uint8Array(nonWitnessUtxo),
            witnessScript: new Uint8Array(witnessScript)
        });
    });

    // Add outputs
    outputs.forEach(output => {
        const scriptPubKey = Buffer.from(output.scriptPubKey, 'hex');

        psbt.addOutput({
            script: new Uint8Array(scriptPubKey),
            value: output.value
        });
    });

    return psbt.toHex();
};

export const finalizePsbtAndGetTxId = (psbtHex: string) => {
    const psbt = bitcoin.Psbt.fromHex(psbtHex);
    psbt.finalizeAllInputs();
    const transaction = psbt.extractTransaction();
    const txId = transaction.getId();
    return txId;
}
