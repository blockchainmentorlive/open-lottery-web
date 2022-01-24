import { ethers } from "ethers";

export default function useContract({ address, abi, providerOrSigner }) {
  if (!address)
    return {
      address: undefined,
    };
  const contract = new ethers.Contract(address, abi, providerOrSigner);

  function onTicketEvent(fnToExecute) {
    if (!providerOrSigner) return;
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
