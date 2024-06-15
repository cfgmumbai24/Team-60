import express from 'express';
import bodyParser from 'body-parser';
import postRouter from './routes/router.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', postRouter);


connect(process.env.MONGO_URL);
const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});