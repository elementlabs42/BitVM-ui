// UnisatConnector.js
import React from "react";
import { useUnisatConnection } from "./useUnisatConnection";
import { UnisatDropdown } from "./UnisatDropDown";
import useMessage from "antd/es/message/useMessage";
import { Button } from "antd";


export const UnisatConnector = () => {
  const {
    unisatInstalled,
    connected,
    address,
    publicKey,
    balance,
    network,
    version,
    chainType,
    setNetwork,
    setChainType,
  } = useUnisatConnection();

  const [messageApi, contextHolder] = useMessage();

  if (!unisatInstalled) {
    return (
      <div className="App">
        <header className="App-header">
          {contextHolder}
          <div>
            <Button
              onClick={() => {
                window.location.href = "https://unisat.io";
              }}
            >
              Install Unisat Wallet
            </Button>
          </div>
        </header>
      </div>
    );
  }

  return (
    <UnisatDropdown
      connected={connected}
      address={address}
      publicKey={publicKey}
      balance={balance}
      network={network}
      version={version}
      chainType={chainType}
      setNetwork={setNetwork}
      setChainType={setChainType}
      messageApi={messageApi}
    />
  );
};
