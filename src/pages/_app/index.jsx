import { DAppProvider, useEthers, Mumbai, Polygon } from "@usedapp/core";
import "./globals.css";

const POLYGON_CHAIN_ID = 137;
const MUMBAI_CHAIN_ID = 80001;

const config = {
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    [Polygon.chainId]:
      "https://polygon-mainnet.infura.io/v3/175b74a743624fa9a0ecb574225c4ac3",
    [Mumbai.chainId]:
      "https://polygon-mumbai.infura.io/v3/175b74a743624fa9a0ecb574225c4ac3",
  },
};

export default function App({ Component, pageProps }) {
  const { activateBrowserWallet, account } = useEthers();
  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}
