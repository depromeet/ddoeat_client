import ListItem from '@components/common/ListItem';
import type { BasicListItem } from '@components/common/ListItem';
import StarScore from '@components/common/StarScore';
import Tag from '@components/common/Tag';

interface LogItemProps extends BasicListItem {
  date: string;
  userName: string;
  visitNum: number;
  score: number;
}

export default function LogItem({
  isLast,
  hasDeleteOption,
  userName,
  date,
  visitNum,
  score,
}: LogItemProps) {
  return (
    <div>
      <p className="body-14-extraBold px-[16px] py-[10px]">{date}</p>
      <ListItem isLast={isLast} hasDeleteOption={hasDeleteOption}>
        <div className="flex items-center gap-[4px]">
          <p className="body-16-bold">{userName}</p>
          {visitNum > 0 && (
            <Tag size={'small'} className="bg-primary-100 text-primary-500">
              {visitNum}번 방문
            </Tag>
          )}
        </div>
        <StarScore rating={score} />
      </ListItem>
    </div>
  );
}
