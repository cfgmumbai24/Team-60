import { Router } from "express";
import volunteer from '../controller/volunteer.js';
import login from '../controller/login.js';

const router = Router();

router.get('/getAllbeneficiaries/', volunteer.getAllBeneficiaries);
router.post('/addbeneficiary', volunteer.addBeneficiary);
router.post('/login', login);

export default router;
