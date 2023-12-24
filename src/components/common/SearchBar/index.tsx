'use client';

import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

import SearchIcon from '../../../../public/SearchIcon.svg';
import DeleteIcon from '../../../../public/DeleteIcon.svg';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

export default function SearchBar({ icon, ...props }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue('');
  };

  let iconElement = null;
  if (inputValue) {
    iconElement = (
      <div onClick={clearInput} className="cursor-pointer">
        <DeleteIcon />
      </div>
    );
  } else {
    iconElement = (
      <div>
        <SearchIcon />
      </div>
    );
  }

  return (
    <div className="flex items-center px-4 py-2">
      <div className="w-[40px] h-[40px]">{icon}</div>
      <div className="flex w-full h-[52px] px-[12px] py-[16px] bg-white border-none rounded-full items-center">
        <input
          {...props}
          value={inputValue}
          onChange={handleChange}
          className="w-full border-none focus:outline-none caret-primary-500 bg-white"
        />
        {iconElement}
      </div>
    </div>
  );
}
