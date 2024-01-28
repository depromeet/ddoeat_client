import SectionTitle from '../SectionTitle';
import ReVisit from './ReVisit';
import TopVisit from './TopVisit';

export default function Report() {
  return (
    <div className="px-[16px]  pb-[8px]">
      <SectionTitle>또잇또잇 리포트</SectionTitle>
      <div className="flex gap-[8px] mx-[16px] my-[4px]  justify-center items-center">
        <TopVisit />
        <ReVisit />
      </div>
    </div>
  );
}
