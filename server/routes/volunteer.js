import { Router } from "express";
import volunteer from '../controller/volunteer.js';
import login from '../controller/login.js';

const router = Router();

router.get('/getbeneficiaries/:uid', volunteer.getBeneficiaries);
router.post('/addbeneficiary', volunteer.addBeneficiary);
router.post('/login', login);

export default router;
