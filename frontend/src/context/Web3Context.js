// src/context/Web3Context.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import BusinessRegistry from "../ABI/BusinessRegistry.json";


// Replace with your actual contract address
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const contract = new Contract(contractAddress, BusinessRegistry.abi, signer);

      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      setUserAddress(address);
      setIsConnected(true);
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => window.location.reload());
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        isConnected,
        provider,
        signer,
        contract,
        userAddress,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
