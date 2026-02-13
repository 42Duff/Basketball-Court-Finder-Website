import React, { useState } from "react";
import "./SaveCourtPopup.css";

function SaveCourtPopup( {handleSaveClick} ) {

    return(
        <Popup>
            <div className="saveCourtPopup">
                <p className="saveCourtInfo"> Click on map again to replace marker</p>
                <p className="orInfo">OR</p>
                <button type="button" className="saveCourtBtn" onClick={handleSaveClick}>
                    Save Court
                </button>
            </div>
        </Popup>
    );
}

export default SaveCourtPopup;