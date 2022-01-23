import { useState } from "react";

import Info from "./info";
import BuyTicketForm from "./form";

const MIN_TICKET_PRICE = 3;

export default function CreateLottery({ maticPrice }) {
  const [ticketPrice, setTicketPrice] = useState(MIN_TICKET_PRICE);

  return (
    <>
      <div className="mt-10 md:mt-20 md:mx-20">
        <h1>
          Create your own lottery, promote it, and collect a percentage of the
          total ticket revenue.
        </h1>
        <p>The current price for MATIC is ${maticPrice} USD</p>
      </div>
      <div className="text-gray-900 md:flex md:justify-around">
        <div className="md:w-3/5 md:mx-20 items-start">
          <BuyTicketForm {...{ ticketPrice, setTicketPrice }} />
        </div>

        <div className="md:w-2/5 md:mx-20">
          <Info ticketPrice={ticketPrice} />
        </div>
      </div>
    </>
  );
}
