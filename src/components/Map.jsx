import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pin from "../assets/CourtFinder_pin.svg";

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

        var leafletIcon = L.icon ({
            iconUrl: pin,
            iconSize: [38, 95],
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