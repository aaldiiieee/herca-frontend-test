import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makePayment } from "@/services/payments";
import { CommissionTypeProps } from "../types/comp";

const PaymentForm = ({
  onClose,
  transaction,
}: {
  onClose: () => void;
  transaction: CommissionTypeProps;
}) => {
  const queryClient = useQueryClient();

  const paymentMutation = useMutation({
    mutationFn: makePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      onClose();
    },
    onError: (error: { message: string }) => {
      console.error("Payment Error:", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = transaction.commissionAmount;
    paymentMutation.mutate({ transactionId: transaction.id, amount });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Add Payment</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transaction ID
          </label>
          <input
            type="text"
            value={transaction.id}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transaction Name
          </label>
          <input
            type="text"
            value={transaction.marketing}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={transaction.commissionAmount}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={paymentMutation.status === "pending"}
        >
          {paymentMutation.status === "pending"
            ? "Processing..."
            : "Submit Payment"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
