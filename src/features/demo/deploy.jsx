import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useWeb3 from "@/features/web3/hooks/use-web3";
import NumberField from "@/ui/forms/number-field";

export default function CreateContract({}) {
  const [ticketPrice, setTicketPrice] = useState(0.001);

  const router = useRouter();

  async function createLottery() {
    const res = await fetch("/api/lottery/create", {
      method: "POST",
      body: JSON.stringify({ ticketPrice }),
    });
    const json = await res.json();

    router.push(`/play/${json.address}`);
  }

  return (
    <>
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
