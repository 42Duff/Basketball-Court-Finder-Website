import React, { useState } from "react";
import './AddCourtPopup.css';

function AddCourtPopup() {

    const [showAddCourtPopup, setShowAddCourtPopup] = useState(true);

    const closeAddCourtPopup = () => setShowAddCourtPopup(false);

    if(!showAddCourtPopup) return null;

    return (
        <div className="addCourtPopup">
            <button className="closeAddCourtPopupBtn" onClick={closeAddCourtPopup}>
                &times;
            </button>
            <h3 className="addCourtInfo">Click anywhere on the map to mark court location!</h3>
        </div>
    );
}

export default AddCourtPopup;