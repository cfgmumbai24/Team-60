import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VolunteerDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const param1 = urlParams.get('uid');
  
  const [volunteer, setVolunteer] = useState({
    name: '',
    password: '',
    free: false,
    goats: []
  });

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [error, setError] = useState(null);

  // State for editable fields
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [free, setFree] = useState(false);
  const [goats, setGoats] = useState([]);

  // Fetch volunteer details and beneficiaries on component mount and when param1 changes
  useEffect(() => {
    const fetchVolunteerAndBeneficiaries = async () => {
      try {
        const volunteerResponse = await axios.get(`http://localhost:5000/api/volunteer/getbeneficiaries/${param1}`);
        if (volunteerResponse.data.length > 0) {
          setVolunteer(volunteerResponse.data[0]); 
          setName(volunteerResponse.data[0].name);
          setPassword(volunteerResponse.data[0].password);
          setFree(volunteerResponse.data[0].free);
          setGoats(volunteerResponse.data[0].goats);
        } else {
          setError('Volunteer not found');
        }

        const beneficiariesResponse = await axios.get(`http://localhost:5000/api/beneficiaries/${param1}`);
        setBeneficiaries(beneficiariesResponse.data);
      } catch (error) {
        console.error('Error fetching volunteer and beneficiaries:', error);
        setError('Failed to fetch volunteer and beneficiaries');
      }
    };

    if (param1) {
      fetchVolunteerAndBeneficiaries();
    }
  }, [param1]);

  // Function to handle form submission for updating volunteer
  const handleUpdate = async (event) => {
    event.preventDefault();
    
    try {
      const updatedVolunteer = {
        ...volunteer,
        name: name,
        password: password,
        free: free,
        goats: goats
      };

      // Send updated volunteer data to backend
      const response = await axios.put(`http://localhost:5000/api/volunteer/update/${param1}`, updatedVolunteer);
      console.log('Updated Volunteer:', response.data);
      // Optionally update local state or show success message
    } catch (error) {
      console.error('Error updating volunteer:', error);
      setError('Failed to update volunteer');
    }
  };

  return (
    <div className="container">
      <h2>Volunteer Details</h2>
      {error && <p className="error-message">{error}</p>}
      {volunteer.name && (
        <>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleUpdate} className="form">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={free}
                      onChange={(e) => setFree(e.target.checked)}
                      className="form-check-input"
                    />
                    Free
                  </label>
                </div>
                
                <div className="form-group">
                  <label htmlFor="goats">Villages:</label>
                  <input
                    type="text"
                    id="goats"
                    value={goats.length > 0 ? goats.join(', ') : ''}
                    onChange={(e) => setGoats(e.target.value.split(', '))}
                    className="form-control"
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>

            <div className="col-md-6">
              <h3>Beneficiaries</h3>
              <ul className="list-group">
                {beneficiaries.map((beneficiary) => (
                  <li key={beneficiary._id} className="list-group-item">
                    <strong>Name:</strong> {beneficiary.name}<br />
                    <strong>Address:</strong> {beneficiary.address}<br />
                    <strong>Phone:</strong> {beneficiary.phone}<br />
                    {/* Add more beneficiary details as needed */}
                  </li>
                ))}
                <li  className="list-group-item">
                    <strong>Name:</strong> Yash<br />
                    <strong>Address:</strong>Vardodra<br />
                    <strong>Phone:</strong> 9985751245<br />
                    {/* Add more beneficiary details as needed */}
                  </li>
                  <li className="list-group-item">
                    +
                  </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VolunteerDetails;
