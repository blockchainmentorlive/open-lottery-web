import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { ethers } from "ethers";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";
import Game from "./game";

const abi = require("../../../contracts/lottery.sol/abi.json");

export default function PlayLottery({}) {
  const [ticketPrice, setTicketPrice] = useState(undefined);
  const [lastHash, setLastHash] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState(true);
  const [ticketsSold, setTicketsSold] = useState(0);
  const [tickets, setTickets] = useState([]);

  const {
    query: { contractAddress },
  } = useRouter();

  const { onTicketSold, address, provider } = useWeb3();

  const { onTicketEvent, contract } = useContract({
    address: contractAddress,
    abi,
    providerOrSigner: provider,
  });

  useEffect(() => {
    console.dir(contract);
  }, [contract]);

  useEffect(() => {
    console.dir(provider);
  }, [provider]);

  useEffect(async () => {
    if (!contract) return;

    setTicketPrice(
      ethers.utils.formatEther((await contract.ticketPrice()).toString())
    );

    updateSoldTickets();
    setLoading(false);
  }, [contract, address]);

  useEffect(async () => {
    if (!address || !lastHash) return;

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

  const gameProps = {
    ticketPrice,
    ticketsSold,
    busy,
    confirmed,
    tickets,
    address,
    buyTicket,
  };

  return (
    <div>
      <h1>Welcome to the lottery</h1>

      {!loading ? (
        <Game {...gameProps} />
      ) : (
        <div>Loading game from the blockchain....</div>
      )}
    </div>
  );
}
