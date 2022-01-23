import { useState, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";

export default function PlayLottery({ contract, setCurrentStep }) {
  const [players, setPlayers] = useState([]);
  const { state, send } = useContractFunction(contract, "players");

  useEffect(() => {
    (async () => {
      await send();
    })();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      {players.map((address) => (
        <div>{address}</div>
      ))}
      <div>{JSON.stringify(state)}</div>
    </div>
  );
}
