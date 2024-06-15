import express from 'express';
import sample from '../controller/sample.js';

const router = express.Router();

router.get('/', sample);

export default router;