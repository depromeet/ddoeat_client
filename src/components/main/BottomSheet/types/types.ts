import { AnimatePortalProps } from '../../../common/AnimatePortal';

export type BottomSheetStatus = 'full' | 'show';

export interface BottomSheetProps extends AnimatePortalProps {
  defaultShowHeight?: number;
  hasHandleBar?: boolean;
  onCloseBottomSheet: () => void;
}
