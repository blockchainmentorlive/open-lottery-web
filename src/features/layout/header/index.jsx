import Link from "next/link";
import Container from "@/ui/container";

import Account from "./account";
import Balance from "./balance";

export default function Header({}) {
  return (
    <header className="fixed top-0 w-full">
      <Container>
        <div className="flex py-6 px-4 items-center">
          <div className="flex-grow text-lg">
            <Link href={"/"}>
              <a className="text-white border-b-0">
                <>
                  <span className="font-bold">Open</span>
                  <span className="font-light">Lottery</span>
                </>
              </a>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Balance />
            <Account />
          </div>
        </div>
      </Container>
    </header>
  );
}
