import * as React from 'react';

// eslint-disable-next-line unused-imports/no-unused-vars
type CopyFn = (text: string) => Promise<boolean>;

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (error) {
    console.error('Fallback: copy failed', error);
  }
  document.body.removeChild(textArea);
}

export function useCopyToClipboard(delay = 1_000): [boolean, CopyFn] {
  const [hasCopied, setHasCopied] = React.useState(false);

  const onCopy: CopyFn = React.useCallback(
    async (text) => {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);

        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setHasCopied(true);
        setTimeout(() => {
          setHasCopied(false);
        }, delay);

        return true;
      } catch (error) {
        fallbackCopyTextToClipboard(text);

        return false;
      }
    },
    [delay],
  );

  return [hasCopied, onCopy];
}
