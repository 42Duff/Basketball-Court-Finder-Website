import React from "react";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <>
        <Navbar />
        <div className="home-container">
        <h1>CourtFinder</h1>
        <input
            type="text"
            placeholder="Search for courts..."
            className="search-box"
        />
        <button className="near-me-btn">Find Courts Near Me</button>
        </div>
    </>
  );
}

export default HomePage;