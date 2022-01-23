import { useEffect, useState } from "react";

import Moralis from "moralis";
import { useRouter } from "next/router";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Contract } from "@ethersproject/contracts";
import { utils, ethers } from "ethers";
import useInterval from "@/hooks/use-interval";

import SecurePage from "@/ui/page/secure";

import PrimaryButton from "@/ui/buttons/primary";

const abi = require("../../../contracts/lottery.sol/abi.json");

export default function Play({}) {
  const {
    query: { contractAddress },
  } = useRouter();

  const [ticketPrice, setTicketPrice] = useState(undefined);
  const [intervalDelay, setIntervalDelay] = useState(5000);
  const [boughtHash, setBoughtHash] = useState(undefined);
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { user, account } = useMoralis();
  const moralis = useWeb3ExecuteFunction();

  useInterval(() => {
    checkForConfirmation();
  }, intervalDelay);

  useEffect(async () => {
    if (!contractAddress) return;

    await moralis.fetch({
      params: {
        abi,
        contractAddress,
        functionName: "ticketPrice",
      },
      onSuccess: (ticketPrice) => {
        const price = utils.formatEther(ticketPrice.toString());
        console.dir(price);
        setTicketPrice(price);
      },
    });
  }, [contractAddress]);

  async function checkForConfirmation() {
    const TicketPurchase = Moralis.Object.extend("TicketPurchases");
    const query = new Moralis.Query(TicketPurchase);
    try {
      await query.equalTo("transaction_hash", boughtHash);
    } catch {}
    const results = await query.find();
    if (results.count == 0) return;
    setConfirmed(true);
    setBusy(false);
    setIntervalDelay(null);
  }

  async function buyTicket() {
    setBusy(true);
    const msgValue = utils.parseEther(ticketPrice).toString();

    await moralis.fetch({
      params: {
        abi,
        contractAddress,
        functionName: "buyTicket",
        msgValue,
      },
      onSuccess: (data) => setBoughtHash(data.hash),
    });
  }

  return (
    <SecurePage>
      <div className="w-1/2 mx-auto rounded-2xl bg-white p-8 flex justify-center text-gray-700">
        <div>
          <h2>Great, you created a Lottery!</h2>

          <p>Before anyone else can buy a ticket, you have to buy yours!</p>

          <PrimaryButton busy={busy} onClick={buyTicket}>
            Buy Ticket for {ticketPrice} MATIC
          </PrimaryButton>
        </div>
      </div>
    </SecurePage>
  );
}
