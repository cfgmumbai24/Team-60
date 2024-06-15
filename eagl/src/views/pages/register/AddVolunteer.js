import React, { useState } from 'react';
import axios from 'axios';

const AddVolunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    uid: '',
    password: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const response = await axios.post('http://localhost:5000/api/admin/addvolunteer', formData);
      console.log('Volunteer added successfully:', response.data);
      // Reset form
      setFormData({
        name: '',
        uid: '',
        password: '',
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error adding volunteer:', error);
    }
    finally {
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Volunteer</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>UID:</label>
          <input
            type="text"
            name="uid"
            value={formData.uid}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Add Volunteer</button>
      </form>
      {success && <p style={{
        color: 'green',
        textAlign: 'center',
        marginTop: '10px',
      }}>Volunteer added successfully!</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#000', // Black text color
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#000', // Black text color
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '5px',
    color: '#000', // Black text color
  },
  submitButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#003366', // Dark blue background color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AddVolunteer;
