// src/utils/contract.js
import { BrowserProvider, Contract } from "ethers";
import BusinessRegistry from "../ABI/BusinessRegistry.json";

// Replace this with your deployed contract address
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = BusinessRegistry.abi;

export async function getContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new Contract(contractAddress, contractABI, signer);
}
