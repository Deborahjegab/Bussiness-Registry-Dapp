import React from "react";
import { useWeb3 } from "../context/Web3Context";

const ConnectWallet = () => {
    const { connectWallet, isConnected } = useWeb3();

    return (
        <div className="d-flex justify-content-end align-items-center mb-4">
            <button
                className={`btn ${isConnected ? "btn-outline-success" : "btn-primary"} px-4`}
                onClick={connectWallet}
                disabled={isConnected}
            >
                {isConnected ? "✅ Wallet Connected" : "🔌 Connect Wallet"}
            </button>
        </div>
    );
};

export default ConnectWallet;
