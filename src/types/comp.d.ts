export interface CommissionTypeProps {
  id: number;
  marketing: string;
  month: string;
  omzet: number;
  commissionPercentage: number;
  commissionAmount: number;
}

export interface PaymentTypeProps {
  onSubmit: (payment: { amount: number }) => void;
}
