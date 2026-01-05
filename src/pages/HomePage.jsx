import React, { useState } from "react";
import Map from "../components/Map";
import Legend from "../components/Legend";
import MapControls from "../components/MapControls";

function HomePage() {
  const [showLegend, setShowLegend] = useState(true);
  
  const toggleLegend = () => {
    setShowLegend(prev => !prev);
  };

  return (
    <>
        <div className="map-wrapper">
          <Map onToggleLegend={toggleLegend} />

          <MapControls />

          {showLegend && <Legend />}
        </div>
    </>
  );
}

export default HomePage;