import { Router } from "express"
import admin from "../controller/admin.js"

const router = Router();

router.post('/addvolunteer', admin.addvolunteer);
router.delete('/deletevolunteer/:id', admin.deletevolunteer);
router.get('/getAllVolunteers', admin.getAllVolunteer);
// router.post('/getVolunteer', admin.getVolunteer);
router.put('/updateVolunteer/:id', admin.updateVolunteer);
router.put('/assignedVillageVolunteer/:id', admin.assignedVillageVolunteer);

export default router;
