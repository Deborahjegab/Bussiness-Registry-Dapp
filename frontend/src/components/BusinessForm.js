import React, { useState } from "react";
import { getContract } from "../utils/contract";

const BusinessForm = () => {
    const [form, setForm] = useState({
        name: "",
        category: "",
        region: "",
        description: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contract = await getContract();
        try {
            const tx = await contract.submitBusiness(
                form.name,
                form.category,
                form.region,
                form.description
            );
            await tx.wait();
            alert("Business submitted!");
        } catch (error) {
            alert("Submission failed: " + error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Register Your Business</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Business Name</label>
                    <input
                        name="name"
                        className="form-control"
                        placeholder="Enter business name"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                        name="category"
                        className="form-control"
                        placeholder="e.g., Retail, Tech, Agriculture"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Region</label>
                    <input
                        name="region"
                        className="form-control"
                        placeholder="e.g., Kigali"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        placeholder="Describe your business"
                        rows="4"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default BusinessForm;
