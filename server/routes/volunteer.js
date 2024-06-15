import { Router } from express;
import volunteer from '../controller/volunteer.js';

const router = Router();

router.get('/addvolunteer', volunteer.getBeneficiaries);
router.post('/addvolunteer', volunteer.addBeneficiary);

export default router;
