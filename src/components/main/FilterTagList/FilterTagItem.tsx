import { ComponentProps } from 'react';

import { useFilterTag } from '.';

import cn from '@utils/cn';
import Tag from '@components/common/Tag';

export default function FilterTagItem({
  value,
  onChange,
  onClick,
  children,
  className,
  ...restProps
}: Omit<ComponentProps<'input'>, 'value'> & { value: string }) {
  const { selectedTag, setSelectedTag, onSelectedTagChange } = useFilterTag();
  const isSelected = selectedTag === value;

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectedTagChange(e);
    onChange?.(e);
  };

  const handleSelectedTagClick = (e: React.PointerEvent<HTMLInputElement>) => {
    if (isSelected) setSelectedTag(null);
    onClick?.(e);
  };

  return (
    <label className="block overflow-visible">
      <input
        type="radio"
        value={value}
        className="hidden"
        checked={isSelected}
        onChange={handleTagChange}
        onClick={handleSelectedTagClick}
        {...restProps}
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
