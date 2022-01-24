import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function useContract({ address, abi, providerOrSigner }) {
  const [contract, setContract] = useState(undefined);

  useEffect(() => {
    if (!providerOrSigner || !address) return;
    setContract(new ethers.Contract(address, abi, providerOrSigner));
  }, [providerOrSigner, address]);

  function onTicketEvent(fnToExecute) {
    if (!contract) return;
    console.dir("monitoring for sold tickets.");

    contract.on("TicketSold", (to, amount, event) =>
      fnToExecute(to, amount, event)
    );
  }

  return {
    contract,
    onTicketEvent,
  };
}
