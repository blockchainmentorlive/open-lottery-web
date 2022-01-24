import { useState } from "react";
import useWeb3 from "@/features/web3/hooks/use-web3";
import useChain from "@/features/web3/hooks/use-chain";

import Modal from "@/ui/modal";
import Image from "next/image";

import { connectors } from "./config";

export function LogInForm({
  isModalVisible = true,
  setIsModalVisible = () => {},
}) {
  const { authenticate } = useWeb3();
  return (
    <Modal isOpen={isModalVisible} close={() => setIsModalVisible(false)}>
      <h2 className="text-lg my-4 font-medium">
        Please connect to your wallet to continue
      </h2>

      <div className="flex justify-center">
        {connectors
          .filter((connector) => connector.enabled)
          .map(({ title, icon, connectorId }, key) => (
            <div
              key={key}
              onClick={async () => {
                try {
                  await authenticate({ provider: connectorId });
                  window.localStorage.setItem("connectorId", connectorId);
                  setIsModalVisible(false);
                } catch (e) {
                  console.error(e);
                }
              }}>
              <div className="p-8 border rounded-2xl  border-black-100 text-black-900 flex w-full flex-col justify-center">
                <Image src={icon} alt={title} height={64} width={64} />

                <div>{title}</div>
              </div>
            </div>
          ))}
      </div>
    </Modal>
  );
}

export default function LoggedOut({}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <button
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onClick={() => setIsModalVisible(true)}>
        Authenticate
      </button>

      <LogInForm
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
}
