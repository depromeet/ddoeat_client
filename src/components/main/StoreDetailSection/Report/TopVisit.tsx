import { useSearchParams } from 'next/navigation';

import ReportContainer from './ReportContainer';

import DdobabReportOneIcon from 'public/assets/ddobab/ddobab_report_1.svg';
import { useGetReport } from '@hooks/api/useGetReport';

export default function TopVisit() {
  const searchParams = useSearchParams();

  const storeId = Number(searchParams.get('storeId'));

  const { data } = useGetReport(storeId);

  return (
    <ReportContainer>
      <p className="caption-12-regular">이 맛집 최고 단골은</p>
      <p className="header-20">{data?.mostVisitedCount ?? 0}번 방문</p>
      <DdobabReportOneIcon />
    </ReportContainer>
  );
}
