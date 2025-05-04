// src/components/SetAdmin.js
import React, { useState } from "react";
import { getContract } from "../utils/contract";

const SetAdmin = () => {
  const [adminAddress, setAdminAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetAdmin = async () => {
    setLoading(true);
    try {
      const contract = await getContract();
      await contract.setAdmin(adminAddress);
      alert("Admin address updated successfully!");
      setAdminAddress("");
    } catch (error) {
      alert("Error setting admin: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mb-5">
      <h4 className="text-secondary">Set Admin Address</h4>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="New Admin Address"
          value={adminAddress}
          onChange={(e) => setAdminAddress(e.target.value)}
        />
        <button
          className="btn btn-warning"
          onClick={handleSetAdmin}
          disabled={loading || !adminAddress}
        >
          {loading ? "Setting..." : "Set Admin"}
        </button>
      </div>
    </div>
  );
};

export default SetAdmin;
