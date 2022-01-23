import { useEffect, useState } from "react";
import { useChain, useMoralis } from "react-moralis";

import Dropdown from "@/ui/forms/dropdown";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./logos";

const menuItems = [
  {
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />,
    enabled: false,
  },
  {
    key: "0x539",
    value: "Local Chain",
    icon: <ETHLogo />,
    enabled: false,
  },
  {
    key: "0x3",
    value: "Ropsten Testnet",
    icon: <ETHLogo />,
    enabled: false,
  },
  {
    key: "0x4",
    value: "Rinkeby Testnet",
    icon: <ETHLogo />,
    enabled: false,
  },
  {
    key: "0x2a",
    value: "Kovan Testnet",
    icon: <ETHLogo />,
    enabled: false,
  },
  {
    key: "0x5",
    value: "Goerli Testnet",
    icon: <ETHLogo />,
    enabled: false,
  },
  {
    key: "0x38",
    value: "Binance",
    icon: <BSCLogo />,
    enabled: false,
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    icon: <BSCLogo />,
    enabled: false,
  },
  {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
    enabled: true,
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
    enabled: true,
  },
  {
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />,
    enabled: false,
  },
  {
    key: "0xa869",
    value: "Avalanche Testnet",
    icon: <AvaxLogo />,
    enabled: false,
  },
];

export default function Chains() {
  const { switchNetwork, chainId, chain } = useChain();
  const { isAuthenticated } = useMoralis();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
  }, [chainId]);

  const handleMenuClick = (chainId) => {
    switchNetwork(chainId);
  };

  if (!chainId || !isAuthenticated) return "";

  return (
    <Dropdown
      items={menuItems.filter((network) => network.enabled)}
      onClick={(item) => handleMenuClick(item.key)}>
      <div className="flex items-center space-x-2">
        <div>{selected?.icon}</div>
        <div>{selected?.value}</div>
      </div>
    </Dropdown>
  );
}
