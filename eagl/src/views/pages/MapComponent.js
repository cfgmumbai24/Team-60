import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ coordinates }) => {
  const mapCenter = {
    lat: coordinates.lat,
    lng: coordinates.lng,
  };

  return (
    <div className="map-container">
      <MapContainer center={mapCenter} zoom={13} style={{ height: '400px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>
            Person's Location:<br />
            Latitude: {coordinates.lat.toFixed(6)},<br />
            Longitude: {coordinates.lng.toFixed(6)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;