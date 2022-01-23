import Metamask from "./icons/metamask.png";
import WalletConnect from "./icons/walletconnect.svg";
import TrustWallet from "./icons/trustwallet.png";

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
    enabled: true,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
    enabled: false,
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: "injected",
    priority: 3,
    enabled: false,
  },
];
