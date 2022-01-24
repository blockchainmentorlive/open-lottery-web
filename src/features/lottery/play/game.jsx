import LogIn from "@/features/authentication/log-in";
import { getEllipsisTxt } from "@/modules/string";
import SmallButton from "@/ui/buttons/small";

export default function Game({
  ticketPrice,
  ticketsSold,
  busy,
  confirmed,
  tickets,
  address,
  buyTicket,
}) {
  const reducedTickets = tickets.reduce((acc, address) => {
    return acc[address]
      ? { ...acc, [address]: parseInt(acc[address]) + 1 }
      : { ...acc, [address]: 1 };
  }, {});
  return (
    <>
      <div>
        <p className="mt-6 mb-2">
          There have been {ticketsSold} tickets sold so far! Join the fun and
          buy one yourself.
        </p>

        <p className="font-medium text-lg">
          The total winnable pot is up to{" "}
          {parseFloat(ticketPrice * ticketsSold).toFixed(3)} MATIC
        </p>
      </div>

      <div className="border rounded shadow px-8 py-4 my-4 bg-white text-black-800">
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
            {address ? (
              <SmallButton busy={busy} onClick={buyTicket}>
                Buy a Ticket for {ticketPrice} MATIC
              </SmallButton>
            ) : (
              <LogIn />
            )}
          </div>
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

        {Object.entries(reducedTickets).map(([address, count]) => (
          <div className="flex border-b border-green-200 p-2">
            <div className="flex-grow">{getEllipsisTxt(address)}</div>
            <div>{count}</div>
          </div>
        ))}
      </div>
    </>
  );
}
