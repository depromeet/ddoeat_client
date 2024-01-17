import { ComponentProps } from 'react';

import { useFilterTag } from '.';

import cn from '@utils/cn';
import Tag from '@components/common/Tag';

export default function FilterTagItem({
  value,
  onClick,
  children,
  className,
  ...restProps
}: Omit<ComponentProps<'input'>, 'value'> & { value: string }) {
  const { selectedTag, setSelectedTag } = useFilterTag();
  const isSelected = selectedTag === value;

  const handleSelect = (e: React.PointerEvent<HTMLInputElement>) => {
    setSelectedTag(value);
    onClick?.(e);
  };

  return (
    <label className="block overflow-visible">
      <input
        type="radio"
        value={value}
        onClick={handleSelect}
        className="hidden"
        {...restProps}
        checked={isSelected}
      />
      <Tag
        size="large"
        className={cn(
          'bg-primary-50 text-gray-700 select-none shadow-search',
          {
            'bg-primary-300 text-white': isSelected,
          },
          className,
        )}
      >
        {children}
      </Tag>
    </label>
  );
}
