import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import Legend from "../components/Legend";
import MapControls from "../components/MapControls";
import FiltersModal from "../components/FiltersModal";
import AddCourtPopup from "../components/AddCourtPopup";
import AddCourtModal from "../components/AddCourtModal";

function HomePage() {

  // Toggle Legend 
  const [showLegend, setShowLegend] = useState(true);
  
  const toggleLegend = () => {
    setShowLegend(prev => !prev);
  };

  const closeLegendBtn = () => setShowLegend(false);

  //toggle AddCourt Mode
  const [showAddCourtMode, setShowAddCourtMode] = useState(false);

  const toggleAddCourtMode = () => {
    setShowAddCourtMode(prev => !prev);
  };

  // open addCourtModal / save court modal
  const [showAddCourtModal, setShowAddCourtModal] = useState(false);

  const handleSubmit = (e) => {
      e.preventDefault();
      // ADD LATER: Send data to backend.
      closeModal();
  };

  // toggle Filters Modal
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleFilters = () => {
      setShowFilters(prev => !prev);
  };

  const closeFiltersBtn = () => setShowFilters(false);

  // Use User Location
  const [locateUserTrigger, setLocateUserTrigger] = useState(0);

  const locateUser = () => {
    setLocateUserTrigger(prev => prev + 1);
  }

  // Search bar logic
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async (query) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );

      const data = await res.json();
      if (!data.length) return alert("Location not found");

      const { lat, lon, display_name } = data[0];

      setSearchResult({
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        name: display_name,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
        <div className={`map-wrapper ${showAddCourtMode ? "add-court-mode" : ""}`}> 
          <Map 
            onToggleLegend={toggleLegend} 
            onAddCourt={toggleAddCourtMode}
            addCourtMode={showAddCourtMode}
            onToggleFilters={toggleFilters}
            onLocateUserTrigger={locateUserTrigger}
            searchResult={searchResult}
            onSaveCourt={() => setShowAddCourtModal(true)}
          />

          <MapControls 
            locateUser={locateUser}
            onSearch={handleSearch}
          />

          {showLegend && 
            <Legend closeLegendBtn={closeLegendBtn} />
          }
          {showFilters && 
            <FiltersModal closeFiltersModal={closeFiltersBtn} />
          }
          {showAddCourtMode && (
            <AddCourtPopup closeAddCourtPopup={() => setShowAddCourtMode(false)} />
          )}
          {showAddCourtModal && (
            <AddCourtModal closeAddCourtModal={() => setShowAddCourtModal(false)} />
          )}
        </div>
    </>
  );
}

export default HomePage;