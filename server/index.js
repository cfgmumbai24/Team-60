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
app.use(cors());

connect(process.env.MONGODB_URL);
const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


import adminroutes from "./routes/admin.js";
import beneficiaryroutes from "./routes/beneficiary.js";
import volunteerroutes from "./routes/volunteer.js";

app.use('/api/admin', adminroutes);
app.use('/api/beneficiary', beneficiaryroutes);
app.use('/api/volunteer', volunteerroutes);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});