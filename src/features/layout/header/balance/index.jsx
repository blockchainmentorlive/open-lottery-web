import { useMoralis, useNativeBalance } from "react-moralis";

export default function Balance(props) {
  const { data: balance } = useNativeBalance(props);
  const { account, isAuthenticated } = useMoralis();

  if (!account || !isAuthenticated) return null;

  return <div>{balance.formatted}</div>;
}
