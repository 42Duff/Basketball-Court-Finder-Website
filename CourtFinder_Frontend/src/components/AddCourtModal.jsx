import React, { useState } from "react";
import { createPortal } from "react-dom";
import './AddCourtModal.css';

function AddCourtModal({ closeAddCourtModal, markerPosition, onSubmitCourt, exitAddCourtMode }) {

    const [name, setName] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [courtType, setCourtType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCourt = {
            name,
            latitude: markerPosition.lat,
            longitude: markerPosition.lng,
            court_type: courtType,
            address: streetAddress,
            city: "TEMP",
            zipcode: "TEMP",
            state: "TEMP",
            status: "pending"
        };


        await onSubmitCourt(newCourt);

        exitAddCourtMode();
    };

    return createPortal(
        <div 
          className="addCourtModal" 
          onClick={closeAddCourtModal}
        >
            <div 
              className="addCourtContainer"
              onClick={e => e.stopPropagation()}
            >
                <button className="closeAddCourtModalBtn" onClick={closeAddCourtModal}>
                    &times;
                </button>

                <h1 className="addCourtH1">Add a New Court</h1>

                <form className="addCourtForm" onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="courtName">Court Name</label>
                        <input 
                        id="courtName" 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="streetAddress">Street Address</label>
                        <input 
                        id="streetAddress" 
                        type="text" 
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        required 
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="courtName">Court Type</label>
                        <select 
                        id="courtType"
                        value={courtType}
                        onChange={(e) => setCourtType(e.target.value)} 
                        required
                        >
                            <option value="" disabled>
                                Select Court Type
                            </option>
                            <option value="INDOOR">Indoor</option>
                            <option value="OUTDOOR">Outdoor</option>
                        </select>
                    </div>

                    <div className="formButtons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={closeAddCourtModal}>
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default AddCourtModal;