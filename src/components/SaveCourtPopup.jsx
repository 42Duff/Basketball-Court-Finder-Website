import React, { useState } from "react";
import "./SaveCourtPopup.css";

function SaveCourtPopup() {

    return(
        <div className="saveCourtPopup">
            <p className="saveCourtInfo"> Click on map again to replace marker</p>
            <p className="orInfo">OR</p>
            <button className="saveCourtBtn">Save Court</button>
        </div>
    );
}

export default SaveCourtPopup;