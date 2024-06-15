import { Router } from "express"
import village from "../controller/village.js"

const router = Router();

router.get('/getVillages', village.getVillages);
router.get('/getVillage/:village', village.getBeneificiariesByVillage);

export default router;