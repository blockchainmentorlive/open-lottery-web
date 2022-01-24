import { useEffect, useState } from "react";
import Web3Provider from "@/features/web3";
import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";
import { ethers, utils } from "ethers";

const abi = require("../contracts/lottery.sol/abi.json");

function TestPage() {
  const {
    watchEvents,
    provider,
    getBalance,
    address,
    authenticate,
    disconnect,
  } = useWeb3();

  const { onTicketSold } = useContract({
    address: "0x4BFe09F31C0404E34DF4fb165A73FD59FFeD094E",
    abi,
    providerOrSigner: provider,
  });

  onTicketSold((to, amount) => console.dir({ to, amount: amount.toString() }));

  // useEffect(async () => {
  //   await watchEvents({
  //     contractAddress: "0xd9145CCE52D386f254917e481eB44e9943F39138",
  //     eventSignatures: ["TicketSold(address,uint256)"],
  //     callback: (event) => {
  //       console.log(event);
  //     },
  //   });
  // }, []);

  function truncate(address) {
    if (!address) return "";
    return address.slice(0, 6) + "..." + address.slice(36, address.length - 1);
  }

  function formatEth(wei) {
    if (!wei) return "";
    return ethers.utils.formatEther(wei);
  }

  return (
    <div>
      <div className="flex space-x-4 items-center">
        {address && (
          <>
            <div>{truncate(address)}</div>
          </>
        )}

        <div>
          {address ? (
            <button className="border py-2 px-10" onClick={disconnect}>
              Log out
            </button>
          ) : (
            <button className="border py-2 px-10" onClick={authenticate}>
              Log in
            </button>
          )}
        </div>
      </div>
      <div>Hello there</div>
    </div>
  );
}

export default function TestApp({}) {
  return (
    <Web3Provider>
      <TestPage />
    </Web3Provider>
  );
}
