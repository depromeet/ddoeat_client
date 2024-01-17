import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  createContext,
  useContext,
} from 'react';

import FilterTagItem from './FilterTagItem';

import cn from '@utils/cn';

interface FilterTagListProps {
  selectedTag: string | null;
  setSelectedTag: Dispatch<SetStateAction<string | null>>;
}

const FilterTagContext = createContext<FilterTagListProps | null>(null);

function FilterTagList({
  selectedTag,
  setSelectedTag,
  className,
  children,
}: HTMLAttributes<HTMLDivElement> & FilterTagListProps) {
  return (
    <FilterTagContext.Provider value={{ selectedTag, setSelectedTag }}>
      <div className={cn('flex w-full overflow-x-scroll', className)}>
        <div className=" min-w-max flex gap-[8px] pb-[12px]">{children}</div>
      </div>
    </FilterTagContext.Provider>
  );
}

export function useFilterTag() {
  const filter = useContext(FilterTagContext);

  if (!filter) throw new Error('context내에서 사용해야 합니다.');

  return filter;
}

export default Object.assign(FilterTagList, {
  Item: FilterTagItem,
});
