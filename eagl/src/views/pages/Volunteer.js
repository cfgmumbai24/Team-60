// src/Volunteer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate=useNavigate();

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/getAllVolunteers');
        setVolunteers(response.data);
        console.log('Volunteers:', response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchVolunteers();

  }, []);

  if (loading) return <CircularProgress style={{ margin: '20px auto', display: 'block' }} />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Volunteers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Beneficiary</TableCell>
              <TableCell>Villages</TableCell>
              <TableCell>Free</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteers.map((volunteer) => (
              <TableRow key={volunteer._id}>
                <TableCell>{volunteer._id}</TableCell>
                <TableCell>{volunteer.name}</TableCell>
                <TableCell>
                  {/* {volunteer.goats.map((goat) => (
                    <div key={goat._id}>{goat.name}</div>
                  ))} */}
                  {volunteer.goats.length > 0 ? volunteer.goats.map((goat) => (
                    <div key={goat._id}>{goat.length}</div>
                  )) : 'No Beneficiary assigned'}
                </TableCell>
                {/* <TableCell>{volunteer.villages.join(', ')}</TableCell> */}
                <TableCell>
                  {volunteer.villages.length > 0 ? volunteer.villages.join(', ') : 'No villages assigned'}
                </TableCell>
                <TableCell>{volunteer.free ? 'Yes' : 'No'}</TableCell>
                <TableCell onClick={()=>{
                  navigate(`/admin/volunteer/details?uid=${volunteer.uid}`);
                }}>
                  <button>Edit</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Volunteer;
