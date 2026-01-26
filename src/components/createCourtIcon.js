function createCourtIcon(court) {
    // STATUS.LOW MEDIUM BUSY OR UNREPORTED
    // NEED TO SEPARATE HISTORICAL VS CURRENT REPORTED STATUS
    const status = court.status ?? COURT_STATUS.UNREPORTED;

    // TEMP test court (REMOVE ONCE BACKEND IS SET UP)
    const pinFill =
        court.courtType === "INDOOR" ? "#000000" : "#ffffff";

    return L.divIcon({
        className: "court-marker",
        html: courtFinderMarker(
            pinFill,
            status.pin,
            status.ball
        ),
        iconSize: [38, 95],
        iconAnchor: [19, 95],
    });
}