import React, { useState } from "react";
import './CommunitiesPage.css';

function CommunitiesPage() {

    const [showAddCourt, setShowAddCourt] = useState(true);

    const closeModal = () => setShowAddCourt(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // ADD LATER: Send data to backend.
        closeModal();
    };

    if (!showAddCourt) return null;

    return(
        <div className="addCourtModal">
            <div className="addCourtContainer">
                <button className="closeModalBtn" onClick={closeModal}>
                    X
                </button>

                <h1 className="addCourtH1">Add a New Court</h1>

                <form className="addCourtForm">
                    <div className="formGroup">
                        <label htmlFor="courtName">Court Name</label>
                        <input id="courtName" type="text" required/>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="streetAddress">Street Address</label>
                        <input id="streetAddress" type="text" required />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="courtName">Court Type</label>
                        <select id="courtType" required defaultValue="">
                            <option value="" disabled>
                                Select Court Type
                            </option>
                            <option value="INDOOR">Indoor</option>
                            <option value="OUTDOOR">Outdoor</option>
                        </select>
                    </div>

                    <div className="formButtons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CommunitiesPage;