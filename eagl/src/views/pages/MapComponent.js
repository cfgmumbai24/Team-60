import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ locations }) => {
  const mapCenter = {
    lat: locations.length > 0 ? locations[0].lat : 0,
    lng: locations.length > 0 ? locations[0].lng : 0,
  };

  return (
    <div className="map-container">
      <MapContainer center={mapCenter} zoom={13} style={{ height: '400px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]}>
            <Popup>
              {location.name}'s Location:<br />
              Latitude: {location.lat.toFixed(6)},<br />
              Longitude: {location.lng.toFixed(6)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
