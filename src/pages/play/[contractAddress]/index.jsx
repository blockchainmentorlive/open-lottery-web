import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { ethers } from "ethers";
import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";
import { getEllipsisTxt } from "@/modules/string";

import SecurePage from "@/ui/page/secure";

import SmallButton from "@/ui/buttons/small";

const abi = require("../../../contracts/lottery.sol/abi.json");

export default function Play({}) {
  const [ticketPrice, setTicketPrice] = useState(undefined);
  const [lastHash, setLastHash] = useState(undefined);
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [ticketsSold, setTicketsSold] = useState(0);

  const {
    query: { contractAddress },
  } = useRouter();

  const { onTicketSold, address, provider } = useWeb3();
  const { onTicketEvent, contract } = useContract({
    address: contractAddress,
    abi,
    providerOrSigner: provider,
  });

  useEffect(async () => {
    if (!contract) return;

    setTicketPrice(
      ethers.utils.formatEther((await contract.ticketPrice()).toString())
    );

    updateSoldTickets();
  }, [address]);

  useEffect(async () => {
    if (!contract || !lastHash) return;

    setTicketPrice(
      ethers.utils.formatEther((await contract.ticketPrice()).toString())
    );

    onTicketEvent(handleNewEvent);
  }, [address, lastHash]);

  async function updateSoldTickets() {
    setTickets(await contract.tickets());
    setTicketsSold(parseInt((await contract.ticketsSold()).toString()));
  }

  function toWei(ticketprice) {
    return ethers.utils.parseEther(ticketprice);
  }

  async function handleNewEvent(to, amount, event) {
    updateSoldTickets();
    if (lastHash === event.transactionHash) {
      setBusy(false);
      setConfirmed(true);
      onTicketSold();
    }
  }

  async function buyTicket() {
    setBusy(true);
    const tx = await contract
      .connect(provider.getSigner())
      .buyTicket({ value: toWei(ticketPrice) });

    setLastHash(tx.hash);
    setConfirmed(false);
  }

  const reducedTickets = tickets.reduce((acc, address) => {
    return acc[address]
      ? { ...acc, [address]: parseInt(acc[address]) + 1 }
      : { ...acc, [address]: 1 };
  }, {});

  return (
    <SecurePage>
      <div className="w-1/2 mx-auto rounded-2xl bg-white p-8 flex-col  text-gray-700">
        <h1>Welcome to the lottery</h1>

        <div>
          <p className="mt-6 mb-2">
            There have been {ticketsSold} tickets sold so far! Join the fun and
            buy one yourself.
          </p>

          <p className="font-medium text-lg">
            The total winnable pot is up to {ticketPrice * ticketsSold} MATIC
          </p>
        </div>

        <div className="border rounded shadow px-8 py-4 my-4 ">
          <div className="flex items-center">
            <div className="flex-grow ">
              <h2>
                {ticketsSold === 0 ? (
                  <span>There have been no tickets sold yet</span>
                ) : (
                  <span>Lottery tickets sold</span>
                )}
              </h2>
            </div>
            <div>
              <SmallButton busy={busy} onClick={buyTicket}>
                Buy a Ticket for {ticketPrice} MATIC
              </SmallButton>
            </div>
          </div>

          {Object.entries(reducedTickets).map(([address, count]) => (
            <div className="flex border-b border-green-200 p-2">
              <div className="flex-grow">{getEllipsisTxt(address)}</div>
              <div>{count}</div>
            </div>
          ))}
        </div>

        {busy && confirmed && (
          <div className="bg-blue-400 my-2 p-4  text-white">
            <p>
              Metamask will open up and ask you to approve this transaction. If
              it doesn't open on it's own, click the icons, and confirm the
              transaction.
            </p>
          </div>
        )}

        {busy && !confirmed && (
          <div className="bg-pink-400 my-2 p-4  text-white">
            Your ticket purchase is being confirmed on the blockchain. Please
            wait a few moments for this action to complete.
          </div>
        )}
      </div>
    </SecurePage>
  );
}
