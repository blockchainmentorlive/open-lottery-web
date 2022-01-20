import { useEthers } from "@usedapp/core";
import MetaMaskSvg from "@/ui/svgs/metamask";
import OutlineButton from "@/ui/buttons/outline";

export default function Authentication({}) {
  const { activateBrowserWallet, deactivate, account } = useEthers();

  return (
    <>
      {account ? (
        <OutlineButton onClick={() => deactivate()}>
          <div className="flex space-x-1">
            <div>Disconnect wallet</div>
            <MetaMaskSvg size={18} />
          </div>
        </OutlineButton>
      ) : (
        <OutlineButton onClick={() => activateBrowserWallet()}>
          <div className="flex space-x-1">
            <div>Connect wallet</div>
            <MetaMaskSvg size={18} />
          </div>
        </OutlineButton>
      )}
    </>
  );
}
