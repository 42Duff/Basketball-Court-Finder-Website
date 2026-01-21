import React, { useState } from "react";
import Map from "../components/Map";
import Legend from "../components/Legend";
import MapControls from "../components/MapControls";
import FiltersModal from "../components/FiltersModal";

function HomePage() {

  // Toggle Legend 
  const [showLegend, setShowLegend] = useState(true);
  
  const toggleLegend = () => {
    setShowLegend(prev => !prev);
  };

  //toggle AddCourt Mode
  const [showAddCourtMode, setShowAddCourtMode] = useState(false);

  const toggleAddCourtMode = () => {
    setShowAddCourtMode(prev => !prev);
  };

  // toggle Filters Modal
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleFilters = () => {
      setShowFilters(prev => !prev);
  };

  const closeFiltersBtn = () => setShowFilters(false);

  return (
    <>
        <div className={`map-wrapper ${showAddCourtMode ? "add-court-mode" : ""}`}> 
          <Map 
            onToggleLegend={toggleLegend} 
            onAddCourt={toggleAddCourtMode}
            addCourtMode={showAddCourtMode}
            onToggleFilters={toggleFilters}
          />

          <MapControls />
          {showLegend && <Legend />}
          {showFilters && 
            <FiltersModal closeFiltersModal={closeFiltersBtn} />}
        </div>
    </>
  );
}

export default HomePage;