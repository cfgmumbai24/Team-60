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
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('https://cfg-backend.vercel.app/getVolunteers');
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

  const handleEdit = (uid) => {
    navigate(`/admin/volunteer/details?uid=${uid}`);
  };

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
                <TableCell>{volunteer.uid}</TableCell>
                <TableCell>{volunteer.name}</TableCell>
                <TableCell>
                  {volunteer.goats.length > 0 ? volunteer.goats.map((goat) => (
                    <div key={goat._id}>{goat.name}</div>
                  )) : 'No Beneficiary assigned'}
                </TableCell>
                <TableCell>
                  {volunteer.villages.length > 0 ? volunteer.villages.join(', ') : 'No villages assigned'}
                </TableCell>
                <TableCell>{volunteer.free ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(volunteer.uid)}>
                    Edit
                  </Button>
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
