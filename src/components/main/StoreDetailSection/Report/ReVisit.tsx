import { useSearchParams } from 'next/navigation';

import ReportContainer from './ReportContainer';

import { useGetReport } from '@hooks/api/useGetReport';
import DdobabReportTwoIcon from 'public/assets/ddobab/ddobab_report_2.svg';

export default function ReVisit() {
  const searchParams = useSearchParams();

  const storeId = searchParams.get('storeId') ?? '';

  const { data } = useGetReport(storeId);

  return (
    <ReportContainer>
      <p className="caption-12-regular">재방문한 단골은</p>
      <p className="header-20">{data?.totalRevisitedCount}명</p>
      <DdobabReportTwoIcon />
    </ReportContainer>
  );
}
