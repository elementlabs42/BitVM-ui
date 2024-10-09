import { message } from "antd";
import { useEffect, useState } from "react";
import TrezorConnect, { HDNodeResponse } from "trezor-connect";

export const useTrezorConnection = () => {
  const [trezorConnected, setTrezorConnected] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [device, setDevice] = useState<HDNodeResponse | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [address, setAddress] = useState<string>("");


  useEffect(() => {
    TrezorConnect.manifest({
      email: "developer@example.com",
      appUrl: "http://your.application.url",
    });
  }, []);

  const connect = async () => {
    try {
      const response = await TrezorConnect.getPublicKey({
        path: "m/44'/0'/0'/0",
      });
      if (response.success) {
        setDevice(response.payload);
        setAccounts([response.payload.xpub]);
        setTrezorConnected(true);
        await getAccountAddress();
        await getAccountBalance(response.payload.xpub);
        message.success("Connected to Trezor successfully.");

      } else {
        message.error(response.payload.error);
      }
    } catch (error) {
      message.error("Failed to connect to Trezor.");
    }
  };

  const disconnect = () => {
    setDevice(null);
    setAccounts([]);
    setBalance("0");
    setTrezorConnected(false);
    message.info("Disconnected from Trezor.");
  };

  const getAccountAddress = async () => {
    try {
        const response = await TrezorConnect.getAddress({
            path: "m/49'/0'/0'/0/0",
            coin: "btc"
        });
        if (response.success) {
            setAddress(response.payload.address);
        } else {
            message.error(response.payload.error);
        }
    } catch (error) {
      message.error("Failed to retrieve account address.");
    }
  };

  const getAccountBalance = async (xpub: string) => {
    try {
      const response = await TrezorConnect.getAccountInfo({
        coin: "btc",
        descriptor: xpub,
      });
      if (response.success) {
        setBalance(response.payload.balance);
      } else {
        message.error(response.payload.error);
      }
    } catch (error) {
      message.error("Failed to retrieve account balance.");
    }
  };

  return {
    trezorConnected,
    connect,
    disconnect,
    accounts,
    device,
    balance,
    address,
  };
};
