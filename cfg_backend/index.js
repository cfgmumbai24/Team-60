import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'mongoose';
const { connect, connection } = pkg;
import dotenv, { config } from 'dotenv';
import cors from "cors";

dotenv.config();
// import Beneficiary from './models/beneficiary.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(config.env())

connect(process.env.MONGODB_URL);
const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


// import adminroutes from "./routes/admin.js";
// import beneficiaryroutes from "./routes/beneficiary.js";
// import volunteerroutes from "./routes/volunteer.js";
// import villageroutes from "./routes/village.js";

import Beneficiary from './benificiary.js';
import Volunteer from './volunteer.js'


// app.use('/api/admin', adminroutes);
// app.use('/api/beneficiary', beneficiaryroutes);
// app.use('/api/volunteer', volunteerroutes);
// app.use('/api/village', villageroutes);

app.post('/api/beni', async (req, res) => {
    const { name, village, goats, certificate, timestamp, longitude, latitude } = req.body;
    const beneficiary = new Beneficiary({
        name,
        village,
        goats,
        certificate,
        timestamp,
        longitude,
        latitude,
    });

    try {
        await beneficiary.save();
        res.status(200).json(beneficiary);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
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
// app.

app.get('/longitudeLatitude', async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find();
        res.status(200).json(beneficiaries);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/addVolunteer', async(req, res) => {
    const { name, uid, goats, villages, available, password } = req.body;
    const volunteer = new Volunteer({
        name,
        uid,
        goats,
        villages,
        available,
        password,
    });

    try {
        await volunteer.save();
        res.status(200).json(volunteer);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }



});

app.get('/getVolunteers', async(req, res) => {

    try {
        const volunteers = await Volunteer.find();
        res.status(200).json(volunteers);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
);

app.get('/getVolunteer/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const volunteer = await Volunteer.findOne({ uid: id });
        if (volunteer) {
            res.status(200).json(volunteer);
        } else {
            res.status(404).json({ message: "Volunteer not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});




app.put('/updateVolunteerTask/:uid', async(req, res) => {
    const { uid } = req.params;
    const { task } = req.body;
    try {
        const volunteer = await Volunteer.findOneAndUpdate({ uid }, { task }, { new: true });
        if (volunteer) {
            res.status(200).json(volunteer);
        } else {
            res.status(404).json({ message: "Volunteer not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

app.post('/login', async(req, res) => {
    const { uid, password } = req.body;
    try {
        const volunteer = await Volunteer.findOne({uid, password});
        if(volunteer) {
            res.status(200).json(volunteer);
        } else {
            res.status(400).json({error: 'Invalid Credentials'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
