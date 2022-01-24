import useWeb3 from "@/features/web3/hooks/use-web3";

import LogIn from "@/features/authentication/log-in";
import LogOut from "@/features/authentication/log-out";

export default function Account() {
  const { address } = useWeb3();

  return <div>{address ? <LogOut /> : <LogIn />}</div>;
}
