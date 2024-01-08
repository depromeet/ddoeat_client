import ReVisit from './ReVisit';
import TopVisit from './TopVisit';

interface ReportProps {
  topVisitCount: number;
  reVisitCount: number;
}

export default function Report({ topVisitCount, reVisitCount }: ReportProps) {
  return (
    <div className="flex gap-[8px] mx-[16px] my-[4px]">
      <TopVisit topVisitCount={topVisitCount} />
      <ReVisit reVisitCount={reVisitCount} />
    </div>
  );
}
