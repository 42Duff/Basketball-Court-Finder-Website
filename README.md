# Basketball Court Finder Website
CourtFinder helps basketball players discover nearby courts and understand how busy they are by using historical trends and real-time community reporting.

# UI Screenshots

An interactive map that switches between street view mode:

<img width="1920" height="918" alt="streetviewUI" src="https://github.com/user-attachments/assets/4e974c19-1fb9-4956-a724-f914bf250aa0" />

and satellite view mode:

<img width="1920" height="907" alt="satelliteviewUI" src="https://github.com/user-attachments/assets/cb8b7491-3c2b-4961-9c76-80e5762f18ab" />

## Key Features

* Interactive map with basketball court locations
* toggle on/off addCourt mode that allows users to add court pins to the map
* Live user-reported court activty (In Progress)
* Toggle between street and satellite view modes
* A map legend that can be opened and closed

## Tech Stack

* Frontend: React, Javascript, HTML, CSS
* Mapping: Leaflet.js, OpenStreetMap, Stadia Maps
* Backend: (IN PROGRESS)

## Design Decisions

- Leaflet.js was chosen for full control over map layers and markers (wanted to use custom markers)
- Court status logic is separated into constants for scalability

## Getting Started (CURRENTLY FRONTEND ONLY)
1. Clone the repository  
2. Run `npm install`  
3. Run `npm run dev`  
4. Open `http://localhost:5173` in your browser

## Project Status
CourtFinder is actively in development. The frontend and map interactions are almost complete. Still working on adding a filters popup, instructional popups in addCourt mode, and creating working logic for the 'Search Location' and 'Show My Location' features. Backend features such as persistent user reporting and authentication are planned.

### Planned Features
* User accounts & authentication
* Persistent court activity reporting
* Heatmap-based historical activity
* Mobile optimization
* Community groups page where users can communicate
* Trending page that highlights different categories (Hottest courts, Planned Hoop Sessions, Courts of the Month/Week, etc.)

## Why I Built This
Basketball players often spend a lot of time trying to find active courts only to be met with false hope. 
CourtFinder was built to solve that problem using map-based discovery and community reporting.
As both a CIS grad and a former college basketball player, it combines my interests in both software engineering and basketball.
