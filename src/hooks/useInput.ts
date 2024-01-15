import { type ChangeEventHandler, useCallback, useState } from 'react';

type Return = readonly [
  string,
  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  (value: string) => void,
  () => void,
];

const useInput = (initialValue = ''): Return => {
  const [text, setText] = useState(initialValue);

  const onTextChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const setValue = useCallback((value: string) => {
    setText(value);
  }, []);

  const resetValue = useCallback(() => {
    setText(initialValue);
  }, [initialValue]);

  return [text, onTextChange, setValue, resetValue];
};

export default useInput;
