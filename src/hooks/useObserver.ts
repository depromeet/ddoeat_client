import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UseObserverParams {
  onIntersect: IntersectionObserverCallback;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseObserverReturns {
  setTarget: Dispatch<SetStateAction<HTMLElement | null>>;
}

const useObserver = ({
  onIntersect,
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: UseObserverParams): UseObserverReturns => {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      {
        root,
        rootMargin,
        threshold,
      },
    );
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
};

export default useObserver;
