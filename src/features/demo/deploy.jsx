import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ethers } from "ethers";

import { ContractFactory } from "ethers";
import NumberField from "@/ui/forms/number-field";

import { utils } from "ethers";

const abi = require("../../contracts/lottery.sol/abi.json");
const bytecode = require("../../contracts/lottery.sol/bytecode.json");

export default function CreateContract({}) {
  const [creating, setCreating] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0.001);

  const router = useRouter();

  async function createLottery() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    const factory = new ContractFactory(abi, bytecode, provider.getSigner());
    const contract = await factory.deploy(
      utils.parseEther(ticketPrice.toString())
    );

    router.push(`/play/${contract.address}`);
  }

  if (!creating)
    return (
      <button
        className="border rounded py-2 px-10 bg-gray-600"
        onClick={() => setCreating(true)}>
        Create a lottery (TESTNET)
      </button>
    );

  return (
    <>
      <div className="">
        <div className="flex items-center space-x-2">
          <div className="w-32">
            <label>Ticket price</label>
          </div>
          <div className="w-32 flex items-center space-x-2">
            <NumberField
              value={ticketPrice}
              onChange={(val) => setTicketPrice(val)}
            />
            <div>MATIC</div>
          </div>
        </div>
      </div>

      <div className="my-4">
        <button
          className="border rounded py-2 px-10 bg-gray-600"
          onClick={createLottery}>
          Create your lottery
        </button>
      </div>
    </>
  );
}
