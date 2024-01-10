import ReportContainer from './ReportContainer';

import DdobabReportOneIcon from 'public/assets/ddobab/ddobab_report_1.svg';

interface TopVisitCountProps {
  topVisitCount: number;
}

export default function TopVisit({ topVisitCount }: TopVisitCountProps) {
  return (
    <ReportContainer>
      <p className="caption-12-regular">이 맛집 최고 단골은</p>
      <p className="header-20">{topVisitCount}번 방문</p>
      <DdobabReportOneIcon />
    </ReportContainer>
  );
}
