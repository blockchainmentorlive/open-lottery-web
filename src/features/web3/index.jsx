import { createContext, useState, useEffect } from "react";
import { ethers, utils } from "ethers";

export const Web3Context = createContext(undefined);

export default function Web3Provider({ children }) {
  const [provider, setProvider] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  useEffect(async () => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum, "any"));
  }, []);

  useEffect(() => {
    window.ethereum.on("accountsChanged", async (accounts) => {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      setProvider(provider);
      setAddress(accounts[0]);
      setBalance(await provider.getBalance(accounts[0]));
    });
  }, [address]);

  async function onTicketSold() {
    setBalance(await provider.getBalance(address));
  }

  async function authenticate() {
    await provider.send("eth_requestAccounts");
    const signer = provider.getSigner();
    const _address = await signer.getAddress();
    setAddress(_address);
    setBalance(await provider.getBalance(_address));
  }

  function disconnect() {
    console.log("disconnect");
    setAddress(undefined);
    setBalance(0);
  }

  async function getNetwork() {
    return address && (await provider.getNetwork());
  }

  function getSigner() {
    return provider && provider.getSigner();
  }

  const data = {
    provider,
    address,
    authenticate,
    disconnect,
    balance,
    getNetwork,
    getSigner,
    onTicketSold,
  };

  return <Web3Context.Provider value={data}>{children}</Web3Context.Provider>;
}
