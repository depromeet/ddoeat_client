import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { axiosRequest } from '@api/api-config';

interface ReportProps {
  data: {
    storeId: string;
    storeMainImageUrl: string;
    mostVisitedCount: number;
    totalRevisitedCount: number;
  };
}

const getReport = (storeId: string): Promise<ReportProps> => {
  return axiosRequest('get', `/api/v1/stores/${storeId}/reports`);
};

export const useGetReport = (
  storeId: string,
): UseQueryResult<ReportProps, Promise<ReportProps>> => {
  return useQuery({
    queryKey: ['get-report', storeId],
    queryFn: () => getReport(storeId),
    enabled: !!storeId,
  });
};
