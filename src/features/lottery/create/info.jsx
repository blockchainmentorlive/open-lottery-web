export default function Info({ children, ticketPrice }) {
  return (
    <div>
      <p className="text-lg font-medium">
        You are about to buy the first ticket to your own lottery!
      </p>
      <p>
        What an exciting moment. As soon as your payment is verified on the
        Polygon network, your lottery will be created and you will be taken
        there.
      </p>

      <p className="mb-8">
        The best way to kick off a new lottery is to share it with your family,
        friends, coworkers and other channels! The more people, the bigger the
        prize and thus your 2% is bigger too!
      </p>

      <p>You set the ticket price to {ticketPrice} matic.</p>

      {children}

      <div className="text-white font-thin text-sm  text-center p-2">
        May the force be with you,<span className="italic">always</span>.
      </div>
    </div>
  );
}
