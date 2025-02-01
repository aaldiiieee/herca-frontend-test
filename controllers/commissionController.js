import marketingData from '../data/marketing.json' assert { type: 'json' };
import penjualanData from '../data/penjualan.json' assert { type: 'json' };

const calculateCommission = (omzet) => {
  if (omzet >= 500000000) return { percentage: 10, nominal: omzet * 0.1 };
  if (omzet >= 200000000) return { percentage: 5, nominal: omzet * 0.05 };
  if (omzet >= 100000000) return { percentage: 2.5, nominal: omzet * 0.025 };
  return { percentage: 0, nominal: 0 };
};

export const getCommissionByMonth = (req, res) => {
  const result = marketingData.map((marketing) => {
    const penjualanByMarketing = penjualanData.filter(
      (penjualan) => penjualan.marketing_id === marketing.id
    );

    const omzetByMonth = penjualanByMarketing.reduce((acc, curr) => {
      const month = new Date(curr.date).toLocaleString("default", {
        month: "long",
      });
      acc[month] = (acc[month] || 0) + curr.total_balance;
      return acc;
    }, {});

    const calculations = Object.entries(omzetByMonth).map(([month, omzet]) => {
      const { percentage, nominal } = calculateCommission(omzet);
      return {
        id: marketing.id,
        marketing: marketing.name,
        month,
        omzet,
        commissionPercentage: percentage,
        commissionAmount: nominal,
      };
    });

    return calculations;
  });

  res.json({
    status: "success",
    code: 200,
    data: result.flat(),
  });
};
