'use client';

import { InputHTMLAttributes } from 'react';

import SearchIcon from 'public/assets/icon24/search_24.svg';
import DeleteIcon from 'public/assets/icon24/close_solid_24.svg';
import useInput from '@hooks/useInput';
import Input from '@components/common/Input';

interface SearchTopBarProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export default function SearchTopBar({ icon }: SearchTopBarProps) {
  const [text, onTextChange, resetText] = useInput('');

  return (
    <div>
      <div className="flex items-center px-4 py-2">
        <div className="w-[40px] h-[40px]">{icon}</div>
        <Input
          rightItem={
            text ? (
              <button onClick={resetText}>
                <DeleteIcon />
              </button>
            ) : (
              <SearchIcon />
            )
          }
          value={text}
          onChange={onTextChange}
        />
      </div>
    </div>
  );
}
