import { InputHTMLAttributes } from 'react';

import SearchIcon from 'public/assets/icon24/search_24.svg';
import DeleteIcon from 'public/assets/icon24/close_solid_24.svg';
import Input from '@components/common/Input';

interface SearchTopBarProps extends InputHTMLAttributes<HTMLInputElement> {
  resetText: () => void;
  onClick: () => void;
}

export default function SearchTopBar({
  className,
  placeholder,
  value,
  onChange,
  onKeyDown,
  resetText,
  onClick,
}: SearchTopBarProps) {
  return (
    <div className="flex items-center w-full">
      <Input
        placeholder={placeholder}
        className={className}
        rightItem={
          <div className="flex gap-[4px]">
            {value && (
              <button onClick={resetText}>
                <DeleteIcon />
              </button>
            )}
            <button onClick={onClick}>
              <SearchIcon />
            </button>
          </div>
        }
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
