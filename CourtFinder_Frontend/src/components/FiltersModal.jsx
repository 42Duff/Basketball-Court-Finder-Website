import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./FiltersModal.css";
import PinIcon from "./PinIcon";
import BallIcon from "./BallIcon";
import { COURT_STATUS } from "../constants/courtStatus";

function FiltersModal( { closeFiltersModal } ) {
    const [filters, setFilters] = useState({
        courtType: {
            indoor: true,
            outdoor: true,
        },
        liveStatus: {
            LOW: true,
            MEDIUM: true,
            HIGH: true,
            UNREPORTED: true,
        },
        historicalStatus: {
            LOW: true,
            MEDIUM: true,
            HIGH: true,
            UNREPORTED: true,
        }
    });

    const toggleFilter = (group, key) => {
        setFilters(prev => ({
            ...prev,
            [group]: {
                ...prev[group],
                [key]: !prev[group][key],
            }
        }));
    };

    return createPortal( 
        <div 
          className="modal-backdrop"
          onClick={closeFiltersModal}
        >
            <div 
              className="filters-modal"
              onClick={e => e.stopPropagation()}
            >
                <button className="closeFiltersModalBtn" onClick={closeFiltersModal}>
                    &times;
                </button>
                <h2>Filters</h2>

                <FilterSection title="Court Type">
                    <FilterRow
                    label="Indoor"
                    checked={filters.courtType.indoor}
                    onChange={() => toggleFilter("courtType", "indoor")}
                    icon={<PinIcon pinFill="#000" pinOutline="#fff" />}
                    />
                    
                    <FilterRow
                    label="Outdoor"
                    checked={filters.courtType.outdoor}
                    onChange={() => toggleFilter("courtType", "outdoor")}
                    icon={<PinIcon pinFill="#fff" pinOutline="#000" />}
                    />
                </FilterSection>

                <FilterSection title="Live Busy Levels">
                    {Object.entries(COURT_STATUS).map(([key, status]) => (
                        <FilterRow
                        key={key}
                        label={key}
                        checked={filters.liveStatus[key]}
                        onChange={() => toggleFilter("liveStatus", key)}
                        icon={<BallIcon ballFill={status.ball} />}
                        />  
                    ))}
                </FilterSection>

                <FilterSection title="Historical Busy Levels">
                    {Object.entries(COURT_STATUS).map(([key, status]) => (
                        <FilterRow
                        key={key}
                        label={key}
                        checked={filters.historicalStatus[key]}
                        onChange={() => toggleFilter("historicalStatus", key)}
                        icon={<PinIcon pinFill="#fff" pinOutline={status.pin} />}
                        />  
                    ))}
                </FilterSection>

                <div className="view-results">
                    <button type="submit">
                        View Results
                    </button>
                </div>

            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

function FilterRow({ label, checked, onChange, icon }) {
    return (
        <div className="filter-row">
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
              className="checkbox"
              id={label}
            />

            <label htmlFor={label} className="filter-icon">
                {icon}
            </label>

            <label htmlFor={label} className="filter-label">
                {label}
            </label>

        </div>
    );
}

function FilterSection({ title, children }) {
    return (
        <div className="filter-section">
            <h3>{title}</h3>
            <div className="filter-grid">
                {children}
            </div>
        </div>
    );
}

export default FiltersModal;