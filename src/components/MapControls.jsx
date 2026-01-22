import React, { useState } from "react";
import "./MapControls.css";

function MapControls({ locateUser, onSearch }) {
    const [query, setQuery] = React.useState("");

    const handleSubmit = () => {
        if (!query.trim()) return;
        onSearch(query);
    };

    return (
        <div className="map-controls-container">

            <div className="map-controls">
                <input 
                    type="text" 
                    className="map-search" 
                    placeholder="Search Location"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />

                <button
                    className="search-btn"
                    onClick={handleSubmit}
                    data-tooltip="Search"
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {/* Lens */}
                        <circle cx="11" cy="11" r="7" />

                        {/* Handle */}
                        <line x1="16.5" y1="16.5" x2="21" y2="21" />
                    </svg>
                </button>

                <button 
                    className="show-location" 
                    onClick={locateUser}
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

            </div>
        </div>
    );
}

export default MapControls;