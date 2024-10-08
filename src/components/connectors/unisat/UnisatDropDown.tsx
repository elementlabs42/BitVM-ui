// components/UnisatDropdown.js
import React from "react";
import { Button, Card, Collapse, Radio } from "antd";
import { copyToClipboard, satoshisToAmount } from "./utils";
import { SendBitcoinCard } from "./components/SendBitcoinCard";
import { PushPsbtCard } from "./components/PushPsbtCard";
import { PushTxCard } from "./components/PushTxCard";
import { SignMessageCard } from "./components/SignMessageCard";
import { SignPsbtCard } from "./components/SignPsbtCard";
import { CHAINS_MAP, ChainType } from "./const";

export const UnisatDropdown = ({
  connected,
  address,
  publicKey,
  balance,
  network,
  version,
  chainType,
  setNetwork,
  setChainType,
  messageApi,
}: any) => {
  const unisat = (window as any).unisat;

  const items = [
    {
      key: "sendBitcoin",
      label: <div style={{ textAlign: "start" }}>unisat.sendBitcoin</div>,
      children: <SendBitcoinCard />,
    },
    {
      key: "signMessage",
      label: <div style={{ textAlign: "start" }}>unisat.signMessage</div>,
      children: <SignMessageCard />,
    },
    {
      key: "signPsbt",
      label: <div style={{ textAlign: "start" }}>unisat.signPsbt</div>,
      children: <SignPsbtCard />,
    },
    {
      key: "pushPsbt",
      label: <div style={{ textAlign: "start" }}>unisat.signPsbt</div>,
      children: <PushPsbtCard />,
    },
    {
      key: "pushTx",
      label: <div style={{ textAlign: "start" }}>unisat.pushTx</div>,
      children: <PushTxCard />,
    },
  ];

  const chains = Object.keys(CHAINS_MAP).map((key) => {
    const chain = CHAINS_MAP[key as ChainType];
    return {
      label: chain.label,
      value: chain.enum,
    };
  });

  const supportLegacyNetworks = ["livenet", "testnet"];

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            alignSelf: "center",
          }}
        >
          <div style={{ minWidth: 200 }}> </div>
          <p>Unisat Wallet Demo</p>
          <div style={{ minWidth: 200 }}>
            {connected ? (
              <Button
                onClick={async () => {
                  await unisat.disconnect();
                }}
              >
                disconnect
              </Button>
            ) : null}
          </div>
        </div>

        {connected ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                width: "90%",
                padding: 10,
              }}
            >
              <Card
                size="small"
                title="Wallet Info"
                style={{ width: "100%", marginRight: 5 }}
              >
                <div style={{ textAlign: "left", marginTop: 10 }}>
                  <div style={{ fontWeight: "bold" }}>Version:</div>
                  <div style={{ wordWrap: "break-word" }}>{version}</div>
                </div>

                <div style={{ textAlign: "left", marginTop: 10 }}>
                  <div style={{ fontWeight: "bold" }}>Chain:</div>
                  <Radio.Group
                    onChange={async (e) => {
                      try {
                        const chain = await unisat.switchChain(e.target.value);
                        setChainType(chain.enum);
                      } catch (e) {
                        messageApi.error((e as any).message);
                      }
                    }}
                    value={chainType}
                  >
                    {chains.map((chain) => (
                      <Radio key={chain.value} value={chain.value}>
                        {chain.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>

                <div style={{ textAlign: "left", marginTop: 10 }}>
                  <div style={{ fontWeight: "bold" }}>Network:</div>
                  {supportLegacyNetworks.includes(network) ? (
                    <Radio.Group
                      onChange={async (e) => {
                        try {
                          const network = await unisat.switchNetwork(
                            e.target.value
                          );
                          setNetwork(network);
                        } catch (e) {
                          messageApi.error((e as any).message);
                        }
                      }}
                      value={network}
                    >
                      <Radio value={"livenet"}>livenet</Radio>
                      <Radio value={"testnet"}>testnet</Radio>
                    </Radio.Group>
                  ) : (
                    <div>
                      <p>
                        "unisat.getNetwork" is legacy. Please use
                        "unisat.getChain" instead.{" "}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
              <Card
                size="small"
                title="Account Info"
                style={{ width: "100%", marginLeft: 5 }}
              >
                <div style={{ textAlign: "left", marginTop: 10 }}>
                  <div style={{ fontWeight: "bold" }}>Address:</div>
                  <div
                    style={{ wordWrap: "break-word" }}
                    onClick={() => {
                      copyToClipboard(address);
                      messageApi.success("Address Copied.");
                    }}
                  >
                    {address}
                  </div>
                </div>

                <div style={{ textAlign: "left", marginTop: 10 }}>
                  <div style={{ fontWeight: "bold" }}>PublicKey:</div>
                  <div
                    style={{ wordWrap: "break-word" }}
                    onClick={() => {
                      copyToClipboard(publicKey);
                      messageApi.success("PublicKey Copied.");
                    }}
                  >
                    {publicKey}
                  </div>
                </div>

                <div style={{ textAlign: "left", marginTop: 10 }}>
                  <div style={{ fontWeight: "bold" }}>Balance: </div>
                  <div style={{ wordWrap: "break-word" }}>
                    {satoshisToAmount(balance.total)}{" "}
                    {CHAINS_MAP[chainType] && CHAINS_MAP[chainType].unit}
                  </div>
                </div>
              </Card>
            </div>

            <Collapse
              style={{
                backgroundColor: "rgba(255,255,255,0.7)",
                width: "90%",
              }}
              items={items}
              defaultActiveKey={[]}
              onChange={() => {
                // todo
              }}
            />
          </div>
        ) : (
          <div>
            <Button
              onClick={async () => {
                try {
                  const result = await unisat.requestAccounts();
                  handleAccountsChanged(result);
                } catch (e) {
                  messageApi.error((e as any).message);
                }
              }}
            >
              Connect Unisat Wallet
            </Button>
          </div>
        )}
      </header>
    </div>
  );
};
