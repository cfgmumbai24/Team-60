import React from 'react';
import MapComponent from './MapComponent';

const Map = () => {
  const personCoordinates = {
    lat: 18.1853,
    lng: 76.0420,
  };
  return (
    <div className="Map">
      <h1>Volunteer's Location</h1>
      <MapComponent coordinates={personCoordinates} />
    </div>
  );
};

export default Map;

