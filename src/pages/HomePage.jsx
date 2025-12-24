import React, { useState } from "react";
import Map from "../components/Map";
import Legend from "../components/Legend";

function HomePage() {
  const [showLegend, setShowLegend] = useState(true);
  
  const toggleLegend = () => {
    setShowLegend(prev => !prev);
  };

  return (
    <>
        <div className="map-wrapper">
          <Map onToggleLegend={toggleLegend} />

          {showLegend && <Legend />}
        </div>
    </>
  );
}

export default HomePage;