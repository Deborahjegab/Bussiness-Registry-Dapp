// import React, { useEffect, useState } from "react";
// import { getContract } from "../utils/contract";

// const ReviewerPanel = () => {
//   const [businesses, setBusinesses] = useState([]);

//   useEffect(() => {
//     const fetchBusinesses = async () => {
//       const contract = await getContract();
//       const count = await contract.businessCount();
//       const temp = [];

//       for (let i = 0; i < count; i++) {
//         const business = await contract.getBusiness(i);
//         temp.push({
//           id: i,
//           name: business[0],
//           status: business[5],
//         });
//       }

//       setBusinesses(temp);
//     };

//     fetchBusinesses();
//   }, []);

//   const rejectBusiness = async (id) => {
//     const contract = await getContract();
//     await contract.rejectBusiness(id);
//     alert("Business rejected!");
//   };

//   return (
//     <div className="container">
//       <h2 className="mb-4 text-danger">Reviewer Panel</h2>

//       <h5 className="text-secondary">Pending Businesses to Review</h5>

//       {businesses.filter((b) => b.status == 0).length > 0 ? (
//         <ul className="list-group">
//           {businesses
//             .filter((b) => b.status == 0)
//             .map((b) => (
//               <li
//                 key={b.id}
//                 className="list-group-item d-flex justify-content-between align-items-center"
//               >
//                 {b.name}
//                 <button
//                   className="btn btn-outline-danger btn-sm"
//                   onClick={() => rejectBusiness(b.id)}
//                 >
//                   Reject
//                 </button>
//               </li>
//             ))}
//         </ul>
//       ) : (
//         <div className="alert alert-info mt-3">No businesses to review.</div>
//       )}
//     </div>
//   );
// };

// export default ReviewerPanel;





import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import { ethers } from "ethers";

const ReviewerPanel = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const contract = await getContract();
        const count = await contract.businessCount();
        const temp = [];

        for (let i = 0; i < count; i++) {
          const business = await contract.getBusiness(i);
          temp.push({
            id: i,
            name: business[0],
            category: business[1],
            region: business[2],
            description: business[3],
            owner: business[4],
            status: Number(business[5]),
          });
        }

        setBusinesses(temp);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const contract = await getContract();

      if (action === "approve") {
        await contract.approveBusiness(id);
        alert("✅ Business approved!");
      } else if (action === "reject") {
        await contract.rejectBusiness(id);
        alert("❌ Business rejected!");
      }

      // Refresh list after action
      const updatedBusiness = await contract.getBusiness(id);
      setBusinesses((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: Number(updatedBusiness[5]) } : b
        )
      );
    } catch (error) {
      console.error(`Error during ${action}:`, error);
      alert(`Failed to ${action} business. See console for details.`);
    }
  };

  const pendingBusinesses = businesses.filter((b) => b.status === 0);

  return (
    <div className="container">
      <h2 className="mb-4 text-danger">Reviewer Panel</h2>

      <h5 className="text-secondary">Pending Businesses to Review</h5>

      {pendingBusinesses.length > 0 ? (
        <ul className="list-group">
          {pendingBusinesses.map((b) => (
            <li
              key={b.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{b.name}</strong> <br />
                <small className="text-muted">{b.region} - {b.category}</small>
              </div>
              <div>
                <button
                  className="btn btn-outline-success btn-sm me-2"
                  onClick={() => handleAction(b.id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleAction(b.id, "reject")}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info mt-3">No pending businesses to review.</div>
      )}
    </div>
  );
};

export default ReviewerPanel;
