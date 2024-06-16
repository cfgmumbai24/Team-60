import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import axios from 'axios';

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://cfg-backend.vercel.app/longitudeLatitude');
        if (response.data.length > 0) {
          const coordinates = response.data.map(coord => ({
            lat: coord.latitude,
            lng: coord.longitude,
            name: coord.name,
          }));
          setLocations(coordinates);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch coordinates');
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  return (
    <div className="Map">
      <h1>Volunteer's Locations</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MapComponent locations={locations} />
      )}
    </div>
  );
};

export default Map;
