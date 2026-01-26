import React, { useState } from "react";
import './AddCourtPopup.css';

function AddCourtPopup({closeAddCourtPopup }) {

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