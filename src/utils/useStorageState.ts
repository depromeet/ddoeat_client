import { useState } from 'react';

interface useStorageStateParams<T> {
  key: string;
  initialValue: T;
}

const useStorageState = <T>({
  key,
  initialValue,
}: useStorageStateParams<T>) => {
  const [state, setState] = useState<T>(() => {
    const currentStorageValue =
      typeof window !== 'undefined' ? localStorage.getItem(key) : initialValue;
    const parsedCurrentStorageValue =
      typeof currentStorageValue === 'string'
        ? (JSON.parse(currentStorageValue) as T)
        : null;

    if (parsedCurrentStorageValue) return parsedCurrentStorageValue;

    return initialValue;
  });

  const setStorageState = (value: T | ((arg: T) => T)) => {
    if (value instanceof Function) {
      setState(() => value(state));
      localStorage.setItem(key, JSON.stringify(value(state)));

      return;
    }

    setState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, setStorageState] as const;
};

export default useStorageState;
