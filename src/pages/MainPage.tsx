import { useQuery } from "@tanstack/react-query";
import { getCommissionByMonth } from "../services/commissions";
import CommissionTable from "../components/CommissionTable";

const CommissionPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["commissions"],
    queryFn: getCommissionByMonth,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Marketing Commissions</h1>
      </div>
      <CommissionTable commissions={data.data} />
    </div>
  );
};

export default CommissionPage;
