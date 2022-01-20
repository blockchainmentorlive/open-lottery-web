import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import MetaMaskSvg from "@/ui/svgs/metamask";
import NumberField from "@/ui/forms/number-field";
import { toEth } from "@/modules/units";
import PrimaryButton from "@/ui/buttons/primary";

import Info from "./info";

const MIN_TICKET_PRICE = 3;
const MIN_PLAYER_COUNT = 5;
const MAX_PLAYER_COUNT = 25;
const MAX_LENGTH_IN_DAYS = 7;
const operaterFee = "2%";

export default function CreateLottery({ maticPrice }) {
  const [ticketPrice, setTicketPrice] = useState(MIN_TICKET_PRICE);
  const [minPlayers, setMinPlayers] = useState(MIN_PLAYER_COUNT);
  const [maxPlayers, setMaxPlayers] = useState(MAX_PLAYER_COUNT);
  const [dayLength, setDayLength] = useState(MAX_LENGTH_IN_DAYS);
  const [errors, setErrors] = useState({
    ticketPrice: undefined,
    minPlayers: undefined,
    maxPlayers: undefined,
    dayLength: undefined,
  });
  const [activeField, setActiveField] = useState(undefined);

  const { activateBrowserWallet, account } = useEthers();

  function handleCreate() {}

  function validateMinPlayers() {
    setErrors((prev) => ({
      ...prev,

      minPlayers:
        Number(minPlayers) < MIN_PLAYER_COUNT
          ? `Must be at least ${MIN_PLAYER_COUNT}`
          : undefined,
    }));
  }

  function validateMaxPlayers() {
    setErrors((prev) => ({
      ...prev,

      maxPlayers:
        Number(maxPlayers) > MAX_PLAYER_COUNT
          ? `Must be less than ${MAX_PLAYER_COUNT + 1}`
          : undefined,
    }));
  }

  return (
    <div className="md:mx-24 md:my-20 text-gray-900">
      <h1>
        Create your own lottery, promote it, and collect {operaterFee} of the
        total ticket revenue.
      </h1>

      <p>The current price for MATIC is ${maticPrice} USD</p>

      <div className="p-8 my-8 rounded-lg bg-gray-700 text-white flex flex-wrap md:justify-around ">
        <div className="flex space-x-2 space-y-2 items-center">
          <div className="w-24">Ticket price</div>
          <div className="w-14 ">
            <NumberField
              integerOnly
              value={ticketPrice}
              onChange={setTicketPrice}
            />
          </div>
          <div>MATIC</div>
        </div>

        <div className="flex space-x-2 space-y-2 items-center">
          <div className="w-24">Min payers</div>
          <div
            className={`w-14 ${
              errors.minPlayers ? "border border-red-500 text-white" : ""
            }`}>
            <NumberField
              value={minPlayers}
              onChange={setMinPlayers}
              onValidate={validateMinPlayers}
              integerOnly
            />
          </div>
        </div>

        <div className="flex space-x-2 space-y-2 items-center">
          <div className="w-24">Max players</div>
          <div className="w-14">
            <NumberField
              value={maxPlayers}
              onChange={setMaxPlayers}
              onValidate={validateMaxPlayers}
              integerOnly
            />
          </div>
        </div>

        <div className="flex space-x-2 space-y-2 items-center">
          <div className="w-24">Ends in</div>
          <div className="w-14">
            <NumberField
              value={dayLength}
              onChange={setDayLength}
              integerOnly
            />
          </div>
          <div>Days</div>
        </div>
      </div>

      {account ? (
        <Info ticketPrice={ticketPrice}>
          <PrimaryButton block onClick={handleCreate}>
            Buy my ticket and start my lottery!
          </PrimaryButton>
        </Info>
      ) : (
        <PrimaryButton block onClick={activateBrowserWallet}>
          <div className="flex items-center space-x-2 justify-center ">
            <div>Connect to</div>
            <MetaMaskSvg />
            <div>to create this lottery</div>
          </div>
        </PrimaryButton>
      )}
    </div>
  );
}
