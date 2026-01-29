import React from "react";
import { createPortal } from "react-dom";
import './AddCourtModal.css';

function AddCourtModal({ closeAddCourtModal }) {
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