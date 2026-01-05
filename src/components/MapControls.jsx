import React from "react";
import "./MapControls.css";

function MapControls() {
    return (
        <div className="map-controls-container">

            <div className="map-controls">
                <input type="text" 
                    className="map-search" 
                    placeholder="Search Location"
                />

                <button 
                    className="show-location" 
                    /* onClick={showLocation} */
                    data-tooltip="Show My Location"
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="8" />
                        <circle cx="12" cy="12" r="2" />
                        <line x1="12" y1="2" x2="12" y2="6" />
                        <line x1="12" y1="18" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="6" y2="12" />
                        <line x1="18" y1="12" x2="22" y2="12" />
                    </svg>
                </button>

                <button
                    className="filter-btn"
                    /* onClick={showFilters} */
                    data-tooltip="Filters"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <circle cx="10" cy="6" r="2" />

                        <line x1="4" y1="12" x2="20" y2="12" />
                        <circle cx="14" cy="12" r="2" />

                        <line x1="4" y1="18" x2="20" y2="18" />
                        <circle cx="8" cy="18" r="2" />
                    </svg>
                </button>

            </div>
        </div>
    );
}

export default MapControls;