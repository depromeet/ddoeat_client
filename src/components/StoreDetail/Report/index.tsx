import ReVisitCount from './ReVisitCount';
import TopVisitCount from './TopVisitCount';

interface ReportProps {
  topVisitCount: number;
  reVisitCount: number;
}

export default function Report({ topVisitCount, reVisitCount }: ReportProps) {
  return (
    <div className="w-full">
      <div className="flex gap-[8px] mx-[16px] my-[4px]">
        <TopVisitCount topVisitCount={topVisitCount} />
        <ReVisitCount reVisitCount={reVisitCount} />
      </div>
    </div>
  );
}
