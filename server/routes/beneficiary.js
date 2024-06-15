import { Router } from 'express';
import beneficiary from '../controller/beneficiary.js';
const router = Router();

router.get('/getGoats', beneficiary.getGoats);
router.post('/addGoat', beneficiary.addGoat);
router.put('/updateGoatHealth', beneficiary.updateGoatHealth);

export default router;
