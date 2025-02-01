import penjualanData from "../data/penjualan.json" assert { type: 'json' };

let payments = [];

export const makePayment = (req, res) => {
  const { transactionId, amount } = req.body;

  const transaction = penjualanData.find((t) => t.id === transactionId);
  if (!transaction)
    return res.status(404).json({ message: "Transaction not found" });

  payments.push({ transactionId, amount, date: new Date().toISOString() });
  res.json({ message: "Payment recorded", payments });
};

export const getPayments = (req, res) => {
  res.json({
    success: true,
    statusCode: 200,
    data: payments,
  });
};
