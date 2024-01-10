import ReportContainer from './ReportContainer';

import DdobabReportTwoIcon from 'public/assets/ddobab/ddobab_report_2.svg';

interface ReVisitCountProps {
  reVisitCount: number;
}

export default function ReVisit({ reVisitCount }: ReVisitCountProps) {
  return (
    <ReportContainer>
      <p className="caption-12-regular">재방문한 단골은</p>
      <p className="header-20">{reVisitCount}명</p>
      <DdobabReportTwoIcon />
    </ReportContainer>
  );
}
