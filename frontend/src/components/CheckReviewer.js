import React, { useState } from "react";
import { getContract } from "../utils/contract";

const CheckReviewer = () => {
  const [address, setAddress] = useState("");
  const [isReviewer, setIsReviewer] = useState(null);

  const check = async () => {
    if (!address) return alert("Please enter an address");
    const contract = await getContract();
    const result = await contract.isReviewer(address);
    setIsReviewer(result);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Check if Address is a Reviewer</h4>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="btn btn-primary" onClick={check}>
          Check Reviewer
        </button>
      </div>

      {isReviewer !== null && (
        <div
          className={`alert ${
            isReviewer ? "alert-success" : "alert-danger"
          }`}
        >
          {isReviewer ? "✅ Is a Reviewer" : "❌ Not a Reviewer"}
        </div>
      )}
    </div>
  );
};

export default CheckReviewer;
