import { useState } from "react";

import { useEthers } from "@usedapp/core";

import MetaMaskSvg from "@/ui/svgs/metamask";
import NumberField from "@/ui/forms/number-field";

import PrimaryButton from "@/ui/buttons/primary";

const MIN_PLAYER_COUNT = 5;
const MAX_PLAYER_COUNT = 25;
const MAX_LENGTH_IN_DAYS = 7;

export default function BuyTicketForm({ ticketPrice, setTicketPrice }) {
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
    <div>
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
        <>
          <PrimaryButton block onClick={handleCreate}>
            Buy my ticket and start my lottery!
          </PrimaryButton>
          <div className="text-white font-thin text-sm  text-center p-2">
            May the force be with you,
            <span className="italic">always</span>.
          </div>
        </>
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
