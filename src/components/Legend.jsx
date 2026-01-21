import React from "react";
import "./Legend.css";
import PinIcon from "./PinIcon";
import BallIcon from "./BallIcon";
import { COURT_STATUS } from "../constants/courtStatus";


function Legend( { closeLegendBtn } ) {
    return (
        <div className="legend-container">

            <button className="closeLegendBtn" onClick={closeLegendBtn}>
                &times;
            </button>

            <h1 className="legend-title">Legend</h1>
            <h2 className="legendDescription">* Ball = live data
                                     <br></br>* Marker Outline = Historical Data
            </h2>

            <ul className="iconDescriptions">

                <LegendRow
                    label="Unreported"
                    status={COURT_STATUS.UNREPORTED}
                />

                <LegendRow
                    label="Low (0–4 People)"
                    status={COURT_STATUS.LOW}
                />

                <LegendRow
                    label="Medium (5–9 People)"
                    status={COURT_STATUS.MEDIUM}
                />

                <LegendRow
                    label="High (10+ People)"
                    status={COURT_STATUS.HIGH}
                />

            </ul>

        </div>
    );
}

function LegendRow({ label, status }) {
    return (
        <li className="legend-row">
            <BallIcon
                ballFill={status.ball}
                className="ballIcon"
            />

            <span>{label}</span>

            <PinIcon
                pinFill="#ffffff"      // or indoor/outdoor sample
                pinOutline={status.pin}
                className="pinIcon"
            />
        </li>
    );
}

export default Legend;