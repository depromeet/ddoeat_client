import { AnimatePortalProps } from '../../AnimatePortal';

export type BottomSheetStatus = 'full' | 'show';

export interface BottomSheetProps extends AnimatePortalProps {
  defaultShowHeight?: number;
  hasHandleBar?: boolean;
  handleCloseBottomSheet: () => void;
}
