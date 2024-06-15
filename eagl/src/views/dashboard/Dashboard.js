// Import necessary modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/volunteers'); // Replace with your backend endpoint
        setVolunteers(response.data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };

    fetchVolunteers();
  }, []);

  return (
    <div>
      <h1>Volunteers</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>UID</th>
            <th>Goats</th>
            <th>Villages</th>
            <th>Free</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer) => (
            <tr key={volunteer._id}>
              <td>{volunteer.name}</td>
              <td>{volunteer.uid}</td>
              <td>
                {volunteer.goats.length > 0
                  ? volunteer.goats.map((goatId) => <span key={goatId}>{goatId}</span>)
                  : 'None'}
              </td>
              <td>
                {volunteer.villages.length > 0
                  ? volunteer.villages.map((village) => <span key={village}>{village}</span>)
                  : 'None'}
              </td>
              <td>{volunteer.free ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteersPage;
