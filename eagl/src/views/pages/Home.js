import React from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, Button, Grid, Box } from '@mui/material';
import Payment from '../../components/Payment';

function DonationPage() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Donation Page
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Make a Donation
        </Typography>
        <Payment/>
       
      </Container>
    </>
  );
}

export default DonationPage;
