import { Router } from "express";
import volunteer from '../controller/volunteer.js';

const router = Router();

router.get('/getbeneficiaries/:uid', volunteer.getBeneficiaries);
router.post('/addbeneficiary', volunteer.addBeneficiary);

export default router;
