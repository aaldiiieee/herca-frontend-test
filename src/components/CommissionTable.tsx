import { useState } from "react";
import PaymentForm from "./PaymentForm";
import { CommissionTypeProps } from "../types/comp";

const CommissionTable = ({ commissions }: { commissions: CommissionTypeProps[] }) => {
  const [selectedCommission, setSelectedCommission] = useState<CommissionTypeProps | null>(null);

  const handleAddPayment = (commission: CommissionTypeProps) => {
    setSelectedCommission(commission);
  };

  const closeModal = () => {
    setSelectedCommission(null);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-left text-sm font-medium">Id</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Marketing</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Month</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Omzet</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Commission %</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Commission Amount</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((commission, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition-colors`}
            >
              <td className="px-6 py-3 text-sm text-gray-700">{commission.id}</td>
              <td className="px-6 py-3 text-sm text-gray-700">{commission.marketing}</td>
              <td className="px-6 py-3 text-sm text-gray-700">{commission.month}</td>
              <td className="px-6 py-3 text-sm text-gray-700">
                {commission.omzet.toLocaleString()}
              </td>
              <td className="px-6 py-3 text-sm text-gray-700">
                {commission.commissionPercentage}%
              </td>
              <td className="px-6 py-3 text-sm text-gray-700">
                {commission.commissionAmount.toLocaleString()}
              </td>
              <td className="px-6 py-3 text-sm text-gray-700">
                <button
                  className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  onClick={() => handleAddPayment(commission)}
                >
                  Add Payment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCommission && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/75 transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-lg md:min-w-lg min-w-[90%] relative">
            <button className="absolute top-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={closeModal}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <PaymentForm transaction={selectedCommission} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionTable;
