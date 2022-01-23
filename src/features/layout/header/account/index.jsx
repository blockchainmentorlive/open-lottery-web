import { useEffect } from "react";
import { useMoralis } from "react-moralis";

import LoggedOut from "./logged-out";
import LoggedIn from "./logged-in";

export default function Account() {
  const { user, account, chainId, logout, authenticate } = useMoralis();

  return (
    <div>
      {user && account ? (
        <LoggedIn chainId={chainId} logout={logout} account={account} />
      ) : (
        <LoggedOut authenticate={authenticate} />
      )}
    </div>
  );
}
