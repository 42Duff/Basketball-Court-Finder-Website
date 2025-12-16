import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { COURT_STATUS } from "../constants/courtStatus";
import { courtFinderMarker } from "../constants/courtFinderMarker";

function Map() {

    useEffect(() => {

        // to prevent duplicate initialization (necessary so strictmode doesn't break this code in prod)
        if (L.DomUtil.get("map")?._leaflet_id) {
        return;
        }

        const map = L.map("map").setView([38.9072, -77.0369], 13);

        // tile layer (OpenStreetMap)
        L.tileLayer("https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png", {
            maxZoom: 19,
            detectRetina: true
        }).addTo(map);

        const status = COURT_STATUS.MEDIUM;

        // 🔹 TEMP test court
        const court = {
            courtType: "INDOOR", // try "OUTDOOR"
        };
        
        const pinFill =
            court.courtType === "INDOOR" ? "#000000" : "#ffffff";
        
        const leafletIcon = L.divIcon ({
            className: "court-marker",
            html: courtFinderMarker (
                pinFill,
                status.pin,
                status.ball,
        ),
            iconSize: [38, 95],
            iconAnchor: [19, 95],
        });

        // sample marker
        L.marker([38.9072, -77.036], {icon:leafletIcon}).addTo(map).bindPopup("Washington, DC");
    }, []);


    return (
        <div
            id="map"
            style={{
                height: "80vh",
                width: "100%",
            }}
        />
    );
}

export default Map;