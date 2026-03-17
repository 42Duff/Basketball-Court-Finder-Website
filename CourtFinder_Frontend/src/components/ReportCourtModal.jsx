import React, { useState } from "react";
import { createPortal } from "react-dom";
import './ReportCourtModal.css';

function ReportCourtModal({ closeReportCourtModal, courtId, onReportSuccess }) {

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(c => c + 1);
    }

    const decrement = () => {
        setCount(c => Math.max(0, c - 1));
    }

    const reset = () => {
        setCount(0);
    }

    const submit = async () => {
        try {
            const response = await fetch(`http://localhost:8000/courts/${courtId}/report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    players_count: count
                })
            });

            if (!response.ok) {
                throw new Error("Failed to submit report");
            }

            const data = await response.json();

            console.log("Report saved:", data);

            if (onReportSuccess) {
                onReportSuccess();
            }

            closeReportCourtModal();

        } catch (err) {
            console.error(err);
        }
    };

    return createPortal(
        <div 
            className="reportCourtModal"
            onClick={closeReportCourtModal}
        >

            <div
                className="reportCourtContainer"
                onClick={e => e.stopPropagation()}    
            >

                <button className="closeReportCourtModalBtn" onClick={closeReportCourtModal}>
                    &times;
                </button>

                <h1 className="reportCourtH1">How Many Players?</h1>

                <button className="counter-button" onClick={decrement}>-</button>
                <p className="playerCount">{count}</p>
                <button className="counter-button" onClick={increment}>+</button>

                <button className="submitBtn" onClick={submit}>Submit</button>


            </div>
        

        </div>,
        document.getElementById("modal-root")
    );
}

export default ReportCourtModal;