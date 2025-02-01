import express from 'express';
import { makePayment, getPayments } from '../controllers/paymentsController.js';

const router = express.Router();

router.post('/make-payment', makePayment);
router.get('/get-payments', getPayments);

export default router;