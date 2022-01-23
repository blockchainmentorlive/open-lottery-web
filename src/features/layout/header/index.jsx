import Container from "@/ui/container";

import NetworkSelect from "./network-select";
import Account from "./account";
import Balance from "./balance";

export default function Header({}) {
  return (
    <header className="fixed top-0 w-full">
      <Container>
        <div className="flex py-6 px-4 items-center">
          <div className="flex-grow text-lg">
            <span className="font-bold">Open</span>
            <span className="font-light">Lottery</span>
          </div>

          <div className="flex items-center space-x-3">
            <NetworkSelect />
            <Balance />
            <Account />
          </div>
        </div>
      </Container>
    </header>
  );
}
