interface VisitNumberFlagProps {
  visitNum: number;
}

export default function VisitNumberFlag({ visitNum }: VisitNumberFlagProps) {
  return (
    <div className="rounded-[32px] px-2 py-1 bg-primary-100">
      <p className="caption-10-bold text-primary-500">{visitNum}번 방문</p>
    </div>
  );
}
