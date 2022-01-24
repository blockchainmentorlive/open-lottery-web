import useWeb3 from "@/features/web3/hooks/use-web3";

import LoggedOut from "./logged-out";
import LoggedIn from "./logged-in";

export default function Account() {
  const { address } = useWeb3();

  return <div>{address ? <LoggedIn /> : <LoggedOut />}</div>;
}
