import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { COURT_STATUS } from "../constants/courtStatus";
import { courtFinderMarker } from "../constants/courtFinderMarker";

function Map() {

    useEffect(() => {

        // to prevent duplicate initialization (so strictmode doesn't break this code in prod)
        if (L.DomUtil.get("map")?._leaflet_id) {
        return;
        }

        // satellite tile layer
        const satelliteLayer = L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
                maxZoom: 19,
                attribution:
                "Tiles © Esri - Source: Esri, Maxar, Earthstar Geographics"
            }
        );

        // labels for satellite layer
        const esriLabels = L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
            {
                maxZoom: 19,
                attribution: "Labels © Esri"
            }
        );

        // streetmap tile layer
        const streetLayer = L.tileLayer(
            "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png", 
            {
                maxZoom: 19,
                detectRetina: true
            }
        );

        const map = L.map("map", {
            center: [38.9072, -77.0369],
            zoom: 13,
            layers: [streetLayer],
        });

        const baseMaps = {
            "Street Map": streetLayer,
            "Satellite": satelliteLayer,
        };

        const overlayMaps = {
            "Labels": esriLabels,
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);    

        const status = COURT_STATUS.MEDIUM;

        // TEMP test court (REMOVE ONCE BACKEND IS SET UP)
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

        // sample marker (RESTRUCTURE/REMOVE ONCE BACKEND IS SET UP)
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