import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Default Marker Icon Fix
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Lahore Locations Coordinates
const LAHORE_COORDS = {
  "wapda_town": [31.4338, 74.2882],
  "phase_1": [31.4650, 74.3120],
  "jinnah_hospital": [31.4820, 74.2980],
  "model_town": [31.4880, 74.3210],
  "gulberg": [31.5100, 74.3440],
  "johar_town": [31.4690, 74.2980],
  "lahore_cantt": [31.5200, 74.3800]
};

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      map.fitBounds(coords, { padding: [50, 50] });
    }
  }, [coords, map]);
  return null;
}

export default function LocalMapContainer({ startLoc = "wapda_town", endLoc = "phase_1" }) {
  const start = LAHORE_COORDS[startLoc] || LAHORE_COORDS["wapda_town"];
  const end = LAHORE_COORDS[endLoc] || LAHORE_COORDS["phase_1"];

  const routePoints = [
    start,
    [start[0] + 0.008, start[1] + 0.004],
    [start[0] + 0.018, start[1] + 0.014],
    [end[0] - 0.005, end[1] - 0.005],
    end
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '520px', borderRadius: '24px', overflow: 'hidden', border: '2px solid #1e293b' }}>
      
      {/* Visual Dark Mode Filter for standard OpenStreetMap tiles */}
      <style>{`
        .dark-leaflet-tiles .leaflet-tile-container {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3);
        }
      `}</style>

      <MapContainer 
        center={start} 
        zoom={14} 
        scrollWheelZoom={true} 
        className="dark-leaflet-tiles"
        style={{ width: '100%', height: '100%', backgroundColor: '#091527' }}
      >
        {/* FREE OPENSTREETMAP VISUAL TILES */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap coords={[start, end]} />

        {/* CYAN ROUTE LINE */}
        <Polyline
          positions={routePoints}
          pathOptions={{ color: '#00f2ff', weight: 8, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }}
        />

        <Marker position={start} icon={DefaultIcon}>
          <Popup>🚗 <b>Start Point</b></Popup>
        </Marker>

        <Marker position={end} icon={DefaultIcon}>
          <Popup>📍 <b>Destination</b></Popup>
        </Marker>
      </MapContainer>

    </div>
  );
}