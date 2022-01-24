import { ethers, ContractFactory } from "ethers";

const abi = require("@/contracts/lottery.sol/abi.json");
const bytecode = require("@/contracts/lottery.sol/bytecode.json");

export async function deployLotterContract(ticketPrice) {
  const provider = new ethers.providers.InfuraProvider("maticmum", {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  });

  const wallet = new ethers.Wallet(process.env.PLATFORM_PRIVATE_KEY, provider);

  const factory = new ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy(
    ethers.utils.parseEther(ticketPrice.toString())
  );

  return contract.address;
}

export default async function pricingApi(req, res) {
  const { ticketPrice } = JSON.parse(req.body);
  res.json({ address: await deployLotterContract(ticketPrice) });
}
