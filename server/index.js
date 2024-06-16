import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'mongoose';
const { connect, connection } = pkg;
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors( ));

connect(process.env.MONGODB_URL);
const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


import adminroutes from "./routes/admin.js";
import beneficiaryroutes from "./routes/beneficiary.js";
import volunteerroutes from "./routes/volunteer.js";
import villageroutes from "./routes/village.js";

app.use('/api/admin', adminroutes);
app.use('/api/beneficiary', beneficiaryroutes);
app.use('/api/volunteer', volunteerroutes);
app.use('/api/village', villageroutes);

import Beneficiary from './models/beneficiary.js';
import Volunteer from './models/volunteer.js';

app.post('/api/beni', async (req, res) => {
    const { name, village, goats, certificate, timestamp, longitude, latitude } = req.body;
    const beneficiary = new Beneficiary({
        name,
        village,
        goats,
        certificate,
        timestamp: toString(timestamp),
        longitude,
        latitude,
    });

    try {
        await beneficiary.save();
        res.status(200).json(beneficiary);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/beni', async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find();
        res.status(200).json(beneficiaries);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/longitudeLatitude', async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find();
        res.status(200).json(beneficiaries);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getVolunteer/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const volunteer= await Volunteer.findById({uid:id});
        console.log(volunteer);
        res.status(200).json(volunteer);

    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});