import React from "react";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import Legend from "../components/Legend";

function HomePage() {
  return (
    <>
        <Navbar />
        <Map />
        <Legend />
    </>
  );
}

export default HomePage;