import ReVisitCount from './ReVisit';
import TopVisitCount from './TopVisit';

interface ReportProps {
  topVisitCount: number;
  reVisitCount: number;
}

export default function Report({ topVisitCount, reVisitCount }: ReportProps) {
  return (
    <div className="flex gap-[8px] mx-[16px] my-[4px]">
      <TopVisitCount topVisitCount={topVisitCount} />
      <ReVisitCount reVisitCount={reVisitCount} />
    </div>
  );
}
