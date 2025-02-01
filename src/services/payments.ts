import callApiUrl from "@/libs/api";

export const makePayment = async ({ transactionId, amount }: { transactionId: number; amount: number; }) => {
  const response = await callApiUrl.post("/api/payment/make-payment", { transactionId, amount });
  return response.data;
};
