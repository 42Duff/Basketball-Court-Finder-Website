import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import Legend from "../components/Legend";
import MapControls from "../components/MapControls";
import FiltersModal from "../components/FiltersModal";
import AddCourtPopup from "../components/AddCourtPopup";
import AddCourtModal from "../components/AddCourtModal";
import ReportCourtModal from "../components/reportCourtModal";

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
  // state for getting coordinates of add court marker
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);

  const handleCreateCourt = async (courtData) => {
    const response = await fetch("http://localhost:8000/courts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(courtData)
    });

    if (!response.ok) {
      throw new Error("Failed to create court");
    }

    const data = await response.json();
    console.log("Created:", data);

    setShowAddCourtModal(false);
  };

  // Report court activity
  const [showReportCourtModal, setShowReportCourtModal] = useState(false);
  //handler stores selected court ID
  const [selectedCourtId, setSelectedCourtId] = useState(null);

  // Trigger a refresh after submitting report
  const [reportRefreshTrigger, setReportRefreshTrigger] = useState(0);

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
            onSaveCourt={(latlng) => {
              setNewMarkerPosition(latlng);
              setShowAddCourtModal(true);
            }}
            onReportCourt={(courtId) => {
              setSelectedCourtId(courtId);
              setShowReportCourtModal(true);
            }}
            refreshTrigger={reportRefreshTrigger}
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
            <AddCourtModal 
              closeAddCourtModal={() => setShowAddCourtModal(false)} 
              markerPosition={newMarkerPosition}
              onSubmitCourt={handleCreateCourt}
              exitAddCourtMode={() => setShowAddCourtMode(false)}
            />
          )}
          {showReportCourtModal && (
            <ReportCourtModal
              courtId={selectedCourtId}
              closeReportCourtModal={() => setShowReportCourtModal(false)}
              onReportSuccess={() => {
                setReportRefreshTrigger(prev => prev+1);
              }} 
            />
          )}
        </div>
    </>
  );
}

export default HomePage;