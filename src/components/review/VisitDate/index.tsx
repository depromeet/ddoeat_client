import { HTMLAttributes } from 'react';

export default function VisitDate({
  onChange,
}: HTMLAttributes<HTMLInputElement>) {
  const today = new Date().toISOString().substring(0, 10);

  return (
    <div className="w-full bg-white flex justify-between items-center rounded-[24px] px-[24px] py-[16px]">
      <p className="body-16-bold text-gray-900">방문 날짜</p>
      <input
        placeholder="방문 날짜"
        defaultValue={today}
        max={today}
        type="date"
        className="text-gray-500 h-[24px]"
        onChange={onChange}
      />
    </div>
  );
}
