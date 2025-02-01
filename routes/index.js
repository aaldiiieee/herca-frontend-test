import express from "express";
import commissionRoutes from "./commissionRoutes.js";
import paymentRoutes from "./paymentRoutes.js";

const router = express.Router();

router.use("/api/commission", commissionRoutes);
router.use("/api/payment", paymentRoutes);

export default router;