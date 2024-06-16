import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const GetBeneficiary = () => {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/volunteer/getAllBeneficiaries');
                console.log(response);
                setBeneficiaries(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching beneficiaries:', error);
                setLoading(false);
            }
        };

        fetchBeneficiaries();
    }, [])

    // useEffect(() => {
    //     const hardcodedBeneficiaries = [
    //         {
    //             _id: '1',
    //             name: 'John Doe',
    //             village: 'Village A',
    //             goats: [1, 2],
    //             volunteers: [1],
    //             certificateType: 'AadharCard',
    //         },
    //         {
    //             _id: '2',
    //             name: 'Jane Smith',
    //             village: 'Village B',
    //             goats: [1],
    //             volunteers: [1, 2],
    //             certificateType: 'RationCard',
    //         },
    //         {
    //             _id: '3',
    //             name: 'Sam Wilson',
    //             village: 'Village C',
    //             goats: [],
    //             volunteers: [],
    //             certificateType: 'DomicleCerticiate',
    //         },
    //     ];

    //     setBeneficiaries(hardcodedBeneficiaries);
    //     setLoading(false);
    // }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Beneficiaries
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>UID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Village</TableCell>
                            <TableCell>No of Goats</TableCell>
                            <TableCell>No of Volunteers</TableCell>
                            <TableCell>Certificate Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {beneficiaries.map((beneficiary) => (
                            <TableRow key={beneficiary._id}>
                                <TableCell>{beneficiary._id}</TableCell>
                                <TableCell>{beneficiary.name}</TableCell>
                                <TableCell>{beneficiary.village}</TableCell>
                                <TableCell>{beneficiary.goats.length}</TableCell>
                                <TableCell>{beneficiary.volunteers.length}</TableCell>
                                <TableCell>{beneficiary.certificateType}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => navigate(`/admin/beneficiary/details?uid=${beneficiary._id}`)}>
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
}

export default GetBeneficiary;
