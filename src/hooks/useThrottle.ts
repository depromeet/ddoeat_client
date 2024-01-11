import { useCallback, useRef } from 'react';

const useThrottle = <T>(callback: (args?: T) => void, ms: number) => {
  const ref = useRef({ lastTime: 0 });

  return useCallback(
    (args?: T) => {
      const now = Date.now();

      if (now - ref.current.lastTime >= ms) {
        callback(args);
        ref.current.lastTime = now;
      }
    },
    [callback, ms],
  );
};

export default useThrottle;
