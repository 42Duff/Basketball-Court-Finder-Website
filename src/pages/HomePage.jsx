import React from "react";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import Legend from "../components/Legend";

function HomePage() {
  return (
    <>
        <Navbar />

        <div className="map-wrapper">
          <Map />
          <Legend />
        </div>
    </>
  );
}

export default HomePage;