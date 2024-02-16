import { toast } from 'sonner';

interface CopyToClipboardParams {
  text: string;
  higherThanMusicBar?: boolean;
  onCopySuccess?: () => void;
}

const copyToClipboard = async ({
  text,
  onCopySuccess,
}: CopyToClipboardParams) => {
  const handleCopySuccess = (): void => {
    onCopySuccess?.();
  };

  try {
    await navigator.clipboard.writeText(text);

    handleCopySuccess();
  } catch (err) {
    copyToClipboardByExecCommand(text, handleCopySuccess);
  }
};

export default copyToClipboard;

const copyToClipboardByExecCommand = (
  text: string,
  handleCopySuccess: () => void,
) => {
  const tempEl = document.createElement('span');
  tempEl.textContent = text;
  tempEl.ariaHidden = 'true';
  tempEl.style.userSelect = 'text';
  tempEl.style.all = 'unset';
  tempEl.style.position = 'fixed';
  tempEl.style.top = '0';
  tempEl.style.clipPath = 'rect(0, 0, 0, 0)';
  tempEl.style.whiteSpace = 'pre';

  tempEl.addEventListener('copy', (e: ClipboardEvent) => {
    e.stopPropagation();
    e.clipboardData?.clearData();
    e.clipboardData?.setData('text', text);
  });

  try {
    document.body.appendChild(tempEl);

    const range = document.createRange();
    const selection = document.getSelection();
    range.selectNodeContents(tempEl);
    selection?.addRange(range);

    document.execCommand('copy');
    document.body.removeChild(tempEl);

    handleCopySuccess();
  } catch (err) {
    toast('링크 복사에 실패했어요. 다시 시도해주세요.');
  }
};
