import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";

const AdminPanel = () => {
  const [businesses, setBusinesses] = useState([]);
  const [reviewerAddress, setReviewerAddress] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const contract = await getContract();
      const count = await contract.businessCount();
      const temp = [];

      for (let i = 0; i < count; i++) {
        const business = await contract.getBusiness(i);
        temp.push({
          id: i,
          name: business[0],
          status: business[5],
        });
      }

      setBusinesses(temp);
    };

    fetchBusinesses();
  }, []);

  const approveBusiness = async (id) => {
    setLoading(true);
    const contract = await getContract();
    try {
      await contract.approveBusiness(id);
      alert("Business approved!");
      setBusinesses((prevBusinesses) =>
        prevBusinesses.map((business) =>
          business.id === id ? { ...business, status: 1 } : business
        )
      );
    } catch (error) {
      alert("Error approving business: " + error.message);
    }
    setLoading(false);
  };

  const addReviewer = async () => {
    setLoading(true);
    const contract = await getContract();
    try {
      await contract.addReviewer(reviewerAddress);
      alert("Reviewer added");
      setReviewerAddress(""); // clear input
    } catch (error) {
      alert("Error adding reviewer: " + error.message);
    }
    setLoading(false);
  };

  const setRegionAllowed = async () => {
    setLoading(true);
    const contract = await getContract();
    try {
      await contract.setAllowedRegion(region, true);
      alert("Region allowed");
      setRegion(""); // clear input
    } catch (error) {
      alert("Error allowing region: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Admin Panel</h2>

      <div className="mb-5">
        <h4 className="text-secondary">Approve Pending Businesses</h4>
        {businesses.filter((b) => b.status === 0).length > 0 ? (
          <ul className="list-group">
            {businesses
              .filter((b) => b.status === 0)
              .map((b) => (
                <li key={b.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {b.name}
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => approveBusiness(b.id)}
                    disabled={loading}
                  >
                    {loading ? "Approving..." : "Approve"}
                  </button>
                </li>
              ))}
          </ul>
        ) : (
          <div className="alert alert-info mt-3">No pending businesses.</div>
        )}
      </div>

      <div className="mb-5">
        <h4 className="text-secondary">Add Reviewer</h4>
        <div className="input-group mb-3">
          <input
            value={reviewerAddress}
            onChange={(e) => setReviewerAddress(e.target.value)}
            placeholder="Reviewer Address"
            className="form-control"
          />
          <button
            className="btn btn-primary"
            onClick={addReviewer}
            disabled={loading || !reviewerAddress}
          >
            {loading ? "Adding..." : "Add Reviewer"}
          </button>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="text-secondary">Allow Region</h4>
        <div className="input-group">
          <input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Region Name"
            className="form-control"
          />
          <button
            className="btn btn-primary"
            onClick={setRegionAllowed}
            disabled={loading || !region}
          >
            {loading ? "Allowing..." : "Allow Region"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
