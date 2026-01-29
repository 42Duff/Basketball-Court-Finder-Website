import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { COURT_STATUS } from "../constants/courtStatus";
import { courtFinderMarker } from "../constants/courtFinderMarker";
import "./Map.css";
import satellitePreview from "../assets/satellite-preview.jpg";
import streetPreview from "../assets/street-preview.jpg";
import pinCursor from "../assets/cursorMarkerFull.png";

function createCourtIcon(court) {
    // STATUS.LOW MEDIUM BUSY OR UNREPORTED
    // NEED TO SEPARATE HISTORICAL VS CURRENT REPORTED STATUS
    const currentStatus = 
        court.currentStatus ?? COURT_STATUS.UNREPORTED;

    const historicalStatus =
        court.historicalStatus ?? COURT_STATUS.UNREPORTED;

    const pinFill = court.isTemporary
        ? "#a6a6a6"
        : court.courtType === "INDOOR" 
        ? "#000000" 
        : "#ffffff";

    return L.divIcon({
        className: "court-marker",
        html: courtFinderMarker(
            pinFill,
            historicalStatus.pin,
            currentStatus.ball
        ),
        iconSize: [38, 54],
        iconAnchor: [19, 47.5],
        popupAnchor: [0, -30],
    });
}

function Map ( { onToggleLegend, onAddCourt, addCourtMode, onToggleFilters, onLocateUserTrigger, searchResult, onSaveCourt } ) {

    const mapRef = useRef(null);
    const layersRef = useRef({});
    const [mapMode, setMapMode] = useState("street");
    const tempCourtMarkerRef = useRef(null);

    const popupHtml = `
        <div class="saveCourtPopup">
            <p class="saveCourtInfo"> Click on map again to replace marker</p>
            <p class="orInfo">OR</p>
            <button id="save-court-btn" class="saveCourtBtn type="button">
                Save Court
            </button>
        </div>
    `;

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
                detectRetina: true,
                 attribution:
                    '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> ' +
                    '&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> ' +
                    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
            }
        );

        //starts in streetmap mode
        const map = L.map("map", {
            center: [38.9072, -77.0369],
            zoom: 13,
            layers: [streetLayer],
            zoomControl: false,
        });

        L.control.zoom({
            position: "bottomleft",
        }).addTo(map);

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

        // sample marker (RESTRUCTURE/REMOVE ONCE BACKEND IS SET UP)
        const court = {
            courtType: "INDOOR",
            historicalStatus: COURT_STATUS.MEDIUM,
            currentStatus: COURT_STATUS.HIGH,
        };

        L.marker([38.9072, -77.036], {
            icon: createCourtIcon(court),
        })
        .addTo(map)
        .bindPopup("Washington, DC");
    });
                                                                                                                                                                                                                                                                                                                                                                         
    // Locate and Use User Position
    useEffect(() => {
        if (!mapRef.current || onLocateUserTrigger === 0) return;

        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                const map = mapRef.current;

                map.setView([latitude, longitude], 15, {
                    animate: true,
                });
            },
            (error) => {
                console.error(error);
                alert("Location access denied.");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );
    }, [onLocateUserTrigger]);

    // Searchbar Logic
    useEffect(() => {
        if (!mapRef.current || !searchResult) return;

        mapRef.current.setView(
            [searchResult.lat, searchResult.lng],
            12,
            { animate: true }
        );
    }, [searchResult])

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

    // ADD COURT MODE
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const container = map.getContainer();

        if (addCourtMode) {
            container.style.cursor = `url("${pinCursor}") 25 95, auto`;

            const handleClick = (e) => {
                const tempCourt = {
                    isTemporary: true,
                    currentStatus: COURT_STATUS.UNREPORTED,
                    historicalStatus: COURT_STATUS.UNREPORTED,
            };

            if (tempCourtMarkerRef.current) {
                // existing marker moves to new click
                tempCourtMarkerRef.current.setLatLng(e.latlng).openPopup();
            } else {
                // Marker is created ONCE
                tempCourtMarkerRef.current = L.marker(e.latlng, {
                    icon: createCourtIcon(tempCourt),
                })
                    .addTo(map)
                    .bindPopup(popupHtml)
                    .on("popupopen", () => {
                        const btn = document.getElementById("save-court-btn");
                        if (btn) {
                            btn.onclick = () => {
                                onSaveCourt();
                            };
                        }
                    })
                    .openPopup();
                }
            };

            map.on("click", handleClick);

            // cleanup for when mode is off
            return () => {
                container.style.cursor = "";
                map.off("click", handleClick);
            };
        } else {
            // remove temp marker when addcourtmode is off
            if (tempCourtMarkerRef.current) {
                map.removeLayer(tempCourtMarkerRef.current);
                tempCourtMarkerRef.current = null;
            }
            // make cursor normal if mode is off
            container.style.cursor = "";
        }
    }, [addCourtMode]);

    return (
        <>
        
            <div
                id="map" 
                className="map"
            />

            <div className="map-toggle-wrapper" data-tooltip="Toggle Map Mode">
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
            </div>

            <div className="icon-sidebar">
                <button
                    className="icon-btn"
                    onClick={onToggleLegend}
                    data-tooltip="Toggle Legend"
                >
                    🗺️
                </button>

                <button
                    className="icon-btn"
                    onClick={onAddCourt}
                    data-tooltip="Add Court"
                >
                    📍
                </button>

                <button
                    className="icon-btn"
                    onClick={onToggleFilters}
                    data-tooltip="Filters"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <circle cx="10" cy="6" r="2" />

                        <line x1="4" y1="12" x2="20" y2="12" />
                        <circle cx="14" cy="12" r="2" />

                        <line x1="4" y1="18" x2="20" y2="18" />
                        <circle cx="8" cy="18" r="2" />
                    </svg>
                </button>
            </div>

        </>
    );
}

export default Map;