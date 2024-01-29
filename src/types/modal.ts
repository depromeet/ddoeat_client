export interface Control {
  buttonText: string;
  buttonHandler: () => void;
}

export interface ModalProps {
  isShowing: boolean;
  text: string;
  subText: string;
  controls: Control[];
  onCancel: () => void;
}
