import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { HANDLE_HEIGHT } from '../components/BottomSheetWrapper';
import { BottomSheetProps, BottomSheetStatus } from '../types/types';

import AnimatePortal from '@components/common/AnimatePortal';

interface State {
  isShowing: boolean;
  deviceHeight: number;
  status: BottomSheetStatus;
  setStatus: Dispatch<SetStateAction<BottomSheetStatus>>;

  showStatusChildrenHeight: number;
  fullStatusChildrenHeight: number;
  setShowStatusChildrenHeight: Dispatch<SetStateAction<number>>;
  setFullStatusChildrenHeight: Dispatch<SetStateAction<number>>;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  shouldResize: boolean;
  setShouldResize: Dispatch<SetStateAction<boolean>>;
}

const BottomSheetContext = createContext<State | null>(null);

export function BottomSheetProvider({
  isShowing,
  mode,
  defaultShowHeight = 390,
  children,
}: Pick<
  BottomSheetProps,
  'isShowing' | 'mode' | 'defaultShowHeight' | 'children'
>) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<BottomSheetStatus>('show');
  const [showStatusChildrenHeight, setShowStatusChildrenHeight] = useState(0);
  const [fullStatusChildrenHeight, setFullStatusChildrenHeight] = useState(0);
  const [shouldResize, setShouldResize] = useState(false);

  const [deviceHeight, setDeviceHeight] = useState(0);

  useEffect(() => {
    isShowing && setDeviceHeight(document.documentElement.clientHeight);
  }, [isShowing]);

  return (
    <AnimatePortal isShowing={isShowing} mode={mode}>
      <BottomSheetContext.Provider
        value={{
          isShowing,
          deviceHeight,
          status,
          setStatus,
          showStatusChildrenHeight: Math.min(
            showStatusChildrenHeight + HANDLE_HEIGHT,
            deviceHeight,
            defaultShowHeight,
          ),
          fullStatusChildrenHeight: Math.max(
            fullStatusChildrenHeight,
            deviceHeight,
          ),
          setShowStatusChildrenHeight,
          setFullStatusChildrenHeight,
          isDragging,
          setIsDragging,
          shouldResize,
          setShouldResize,
        }}
      >
        {children}
      </BottomSheetContext.Provider>
    </AnimatePortal>
  );
}

export function useBottomSheet() {
  const bottomSheet = useContext(BottomSheetContext);

  if (!bottomSheet) throw new Error('context내에서 사용해야 합니다.');

  return bottomSheet;
}
