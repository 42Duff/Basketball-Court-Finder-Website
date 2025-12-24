import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { COURT_STATUS } from "../constants/courtStatus";
import { courtFinderMarker } from "../constants/courtFinderMarker";
import "./Map.css";
import satellitePreview from "../assets/satellite-preview.jpg";
import streetPreview from "../assets/street-preview.jpg";

function Map( { onToggleLegend, onAddCourt } ) {

    const mapRef = useRef(null);
    const layersRef = useRef({});
    const [mapMode, setMapMode] = useState("street");

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
                pane: "satellite",
                attribution:
                "Tiles © Esri - Source: Esri, Maxar, Earthstar Geographics"
            }
        );

        // labels for names and boundaries
        const satelliteLabels = L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
            {
                maxZoom: 19,
                pane: "labels",
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

        //starts in streetmap mode
        const map = L.map("map", {
            center: [38.9072, -77.0369],
            zoom: 13,
            layers: [streetLayer],
        });

        map.createPane("satellite");
        map.createPane("labels");

        map.getPane("satellite").style.zIndex = 200;
        map.getPane("labels").style.zIndex = 400;
        map.getPane("labels").style.pointerEvents = "none";

        map.getPane("labels").style.filter = "drop-shadow(0 0 2px #000)";

        mapRef.current = map;

        layersRef.current = {
            street: streetLayer,
            satellite: satelliteLayer,
            labels: satelliteLabels,
        };

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

    const toggleMapMode = () => {
        const map = mapRef.current;
        const { street, satellite, labels } = layersRef.current;

        if (!map) return;

        if (mapMode === "street") {
            map.removeLayer(street);
            map.addLayer(satellite);
            map.addLayer(labels);
            setMapMode("satellite");
        } else {
            map.removeLayer(satellite);
            map.removeLayer(labels);
            map.addLayer(street);
            setMapMode("street");
        }
    };

    return (
        <>
        
            <div
                id="map"
                style={{
                    height: "80vh",
                    width: "100%",
                }}
            />

            <div className="map-toggle" onClick={toggleMapMode}>
                <img
                    src={
                        mapMode === "street"
                        ? satellitePreview
                        : streetPreview
                    }
                    alt="Toggle map mode"
                />
            </div>

            <div className="icon-sidebar">
                <button
                    className="icon-btn"
                    onClick={onToggleLegend}
                    title="Toggle Legend"
                >
                    🗺️
                </button>

                <button
                    className="icon-btn"
                    onClick={onAddCourt}
                    title="Add Court"
                >
                    📍
                </button>
            </div>

        </>
    );
}

export default Map;