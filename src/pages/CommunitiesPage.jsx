import React from "react";
import './CommunitiesPage.css';

function CommunitiesPage() {

    return(
        <div className="addCourtModal">
            <div className="addCourtContainer">
                <h1 className="addCourtH1">Add a New Court</h1>

                <form className="addCourtForm">
                    <div className="formGroup">
                        <label htmlFor="courtName">Court Name</label>
                        <input id="courtName" type="text" />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="streetAddress">Street Address</label>
                        <input id="streetAddress" type="text" />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="courtName">Court Type</label>
                        <select id="courtType" defaultValue="">
                            <option value="" disabled>
                                Select Court Type
                            </option>
                            <option value="INDOOR">Indoor</option>
                            <option value="OUTDOOR">Outdoor</option>
                        </select>
                    </div>

                    <div className="formButtons">
                        <button type="submit">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CommunitiesPage;