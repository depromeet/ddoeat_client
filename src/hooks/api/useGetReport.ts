import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@api/api-config';

interface ReportData {
  storeId: string;
  storeMainImageUrl: string;
  mostVisitedCount: number;
  totalRevisitedCount: number;
}

const getReport = (storeId: string): Promise<{ data: ReportData }> => {
  return axiosRequest('get', `/api/v1/stores/${storeId}/reports`);
};

export const useGetReport = (
  storeId: string,
): UseQueryResult<ReportData, Promise<{ data: ReportData }>> => {
  return useQuery({
    queryKey: ['get-report', storeId],
    queryFn: () => getReport(storeId),
    enabled: !!storeId,
    select: (data) => data.data,
  });
};
