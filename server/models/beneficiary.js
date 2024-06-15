// Import necessary modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BeneficiariesPage = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/beneficiaries'); // Replace with your backend endpoint
        setBeneficiaries(response.data);
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
      }
    };

    fetchBeneficiaries();
  }, []);

  return (
    <div>
      <h1>Beneficiaries</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Village</th>
            <th>Goats</th>
            <th>Volunteers</th>
            <th>Certificate Type</th>
            <th>Certificate</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((beneficiary) => (
            <tr key={beneficiary._id}>
              <td>{beneficiary.name}</td>
              <td>{beneficiary.village}</td>
              <td>
                {beneficiary.goats.length > 0
                  ? beneficiary.goats.map((goatId) => <span key={goatId}>{goatId}</span>)
                  : 'None'}
              </td>
              <td>
                {beneficiary.volunteers.length > 0
                  ? beneficiary.volunteers.map((volunteerId) => <span key={volunteerId}>{volunteerId}</span>)
                  : 'None'}
              </td>
              <td>{beneficiary.certificateType}</td>
              <td>{beneficiary.certificate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BeneficiariesPage;
