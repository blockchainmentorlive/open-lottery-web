import { useState } from "react";
import useWeb3 from "@/features/web3/hooks/use-web3";
import useChain from "@/features/web3/hooks/use-chain";

import Modal from "@/ui/modal";
import Address from "@/ui/address";
import { getExplorer } from "@/modules/networks";
import { getEllipsisTxt } from "@/modules/string";

export default function LogOut({}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { address, disconnect } = useWeb3();
  const { chainId } = useChain();

  return (
    <div>
      <button
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onClick={() => setIsModalVisible(true)}>
        <div className="text-blue-300">{getEllipsisTxt(address, 6)}</div>
      </button>

      <Modal isOpen={isModalVisible} close={() => setIsModalVisible(false)}>
        Account
        <div>
          <Address copyable />
          <div>
            <a
              href={`${getExplorer(chainId)}/address/${address}`}
              target="_blank"
              rel="noreferrer">
              View on Explorer
            </a>
          </div>
        </div>
        <button
          className=""
          onClick={async () => {
            await disconnect();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}>
          Disconnect Wallet
        </button>
      </Modal>
    </div>
  );
}
