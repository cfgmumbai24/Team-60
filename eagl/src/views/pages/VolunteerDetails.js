import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function VillageData() {
  const [villageData, setVillageData] = useState([]);
  const [villageDataLoading, setVillageDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cfg-backend.vercel.app/village/getVillages');
        setVillageData(response.data);
        setVillageDataLoading(false);
      } catch (error) {
        console.error('Error fetching village data:', error);
        setVillageDataLoading(false);
      }
    };

    fetchData();
  }, []);

  if (villageDataLoading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Village Data
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Beneficiary Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {villageData.map((village) => (
              <TableRow key={village._id}>
                <TableCell>{village.name}</TableCell>
                <TableCell>{village.beneficiaries ? village.beneficiaries.length : 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default VillageData;
