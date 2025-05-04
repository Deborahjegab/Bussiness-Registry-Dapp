import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);

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
                    category: business[1],
                    region: business[2],
                    description: business[3],
                    owner: business[4],
                    status: business[5]
                });
            }

            setBusinesses(temp);
        };

        fetchBusinesses();
    }, []);

    const getStatusBadge = (status) => {
        const statusMap = {
            0: { label: "Pending", color: "warning" },
            1: { label: "Approved", color: "success" },
            2: { label: "Rejected", color: "danger" }
        };
        return <span className={`badge bg-${statusMap[status].color}`}>{statusMap[status].label}</span>;
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">All Registered Businesses</h2>
            <div className="row">
                {businesses.map((biz) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={biz.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{biz.name} {getStatusBadge(biz.status)}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{biz.category} | {biz.region}</h6>
                                <p className="card-text">{biz.description}</p>
                                <p className="text-muted small">Owner: {biz.owner}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessList;
