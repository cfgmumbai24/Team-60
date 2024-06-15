import { Router } from 'express';
import beneficiary from '../controller/beneficiary.js';
const router = Router();

router.get('/getGoats/:_id', beneficiary.getGoats);
router.post('/addGoat/:_id', beneficiary.addGoat);
router.put('/updateGoatHealth', beneficiary.updateGoatHealth);

export default router;
