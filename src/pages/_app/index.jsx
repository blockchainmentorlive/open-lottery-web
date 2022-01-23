import { MoralisProvider } from "react-moralis";
import "./globals.css";

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}
