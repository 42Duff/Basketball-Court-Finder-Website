import React from "react";
import Map from "../components/Map";
import Legend from "../components/Legend";

function HomePage() {
  return (
    <>
        <div className="map-wrapper">
          <Map />
          <Legend />
        </div>
    </>
  );
}

export default HomePage;