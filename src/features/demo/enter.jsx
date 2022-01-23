import { useContractFunction } from "@usedapp/core";
import { utils } from "ethers";

export default function EnterLottery({ ticketPrice, contract }) {
  async function buyTicket() {
    await contract.methods.buyTicket({
      value: utils.parseEther(ticketPrice.toString()),
    });
  }

  return (
    <>
      <button
        className="border rounded py-2 px-10 bg-gray-600"
        onClick={buyTicket}>
        Buy your Ticket for {ticketPrice} MATIC
      </button>
    </>
  );
}
