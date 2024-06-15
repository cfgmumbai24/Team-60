import React from 'react';
import MapComponent from './MapComponent';

const Map = () => {
  const personCoordinates = {
    lat: 51.505,
    lng: -0.09,
  };
  return (
    <div className="Map">
      <h1>Person's Location</h1>
      <MapComponent coordinates={personCoordinates} />
    </div>
  );
};

export default Map;

