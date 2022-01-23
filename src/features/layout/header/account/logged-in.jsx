import { useState } from "react";
import { useMoralis } from "react-moralis";

import Modal from "@/ui/modal";
import Address from "./address";
import { getExplorer } from "@/modules/networks";
import { getEllipsisTxt } from "@/modules/string";

export default function LoggedIn({ account, chainId, logout }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>
      <button
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onClick={() => setIsModalVisible(true)}>
        <div className="text-blue-300">{getEllipsisTxt(account, 6)}</div>
      </button>

      <Modal isOpen={isModalVisible} close={() => setIsModalVisible(false)}>
        Account
        <div>
          <Address copyable />
          <div>
            <a
              href={`${getExplorer(chainId)}/address/${account}`}
              target="_blank"
              rel="noreferrer">
              View on Explorer
            </a>
          </div>
        </div>
        <button
          className=""
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}>
          Disconnect Wallet
        </button>
      </Modal>
    </div>
  );
}
