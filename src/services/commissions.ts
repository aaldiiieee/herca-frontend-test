import callApiUrl from "../libs/api";

export const getCommissionByMonth = async () => {
  const response = await callApiUrl.get(
    "/api/commission/get-commission-by-month"
  );
  
  return response.data;
};
