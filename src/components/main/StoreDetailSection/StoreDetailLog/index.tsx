import Image from 'next/image';

import LogItem from '@components/main/LogItem';

interface StoreDetailLogProps {
  date: string;
  score: number;
  storeImgUrl?: string;
  name: string;
  visitNum: number;
  log: string;
  hasDeleteOption: boolean;
  isLast: boolean;
  onClick: () => void;
}

export default function StoreDetailLog({
  date,
  score,
  log,
  storeImgUrl,
  name,
  visitNum,
  hasDeleteOption,
  isLast,
  onClick,
}: StoreDetailLogProps) {
  return (
    <div className="flex flex-col">
      <LogItem
        userName={name}
        visitNum={visitNum}
        score={score}
        isLast={isLast}
        hasDeleteOption={hasDeleteOption}
        date={date}
        onClick={onClick}
      />
      <div className="flex flex-col justify-center px-[16px]">
        {storeImgUrl && (
          <div className="relative max-h-[200px] w-full h-[150px] rounded-[20px] overflow-hidden">
            <Image
              priority
              src={storeImgUrl}
              alt={name}
              className="object-cover"
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          </div>
        )}
        <span className="py-[8px] break-all body-14-regular text-gray-700">
          {log}
        </span>
      </div>
    </div>
  );
}
