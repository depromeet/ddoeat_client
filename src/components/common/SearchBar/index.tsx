'use client';

import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

import SearchIcon from '../../../../public/SearchIcon.svg';
import DeleteIcon from '../../../../public/DeleteIcon.svg';
import Input from '../Input';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export default function SearchBar({ icon }: SearchBarProps) {
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
    <div>
      <div className="flex items-center px-4 py-2 ?">
        <div className="w-[40px] h-[40px] ?">{icon}</div>
        <Input
          rightItem={iconElement}
          onChange={handleChange}
          onClick={clearInput}
          value={inputValue}
        />
      </div>
    </div>
  );
}
