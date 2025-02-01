import express from "express";
import { getCommissionByMonth } from "../controllers/commissionController.js";

const router = express.Router();

router.get("/get-commission-by-month", getCommissionByMonth);

export default router;