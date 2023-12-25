import { type ChangeEventHandler, useCallback, useState } from 'react';

type Return = readonly [
  string,
  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  () => void,
];

const useInput = (initialValue = ''): Return => {
  const [text, setText] = useState(initialValue);

  const onTextChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const resetValue = useCallback(() => {
    setText(initialValue);
  }, [initialValue]);

  return [text, onTextChange, resetValue];
};

export default useInput;
