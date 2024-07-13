import React from "react";
import { Button } from "./components/ui/button";

interface ClipboardProps {
  divRef: React.RefObject<HTMLDivElement>;
  isDisabled?: boolean;
}

const CopytoClipboardButton: React.FC<ClipboardProps> = ({
  divRef,
  isDisabled,
}) => {
  const selectAllContent = () => {
    if (divRef.current) {
      const range = document.createRange();
      range.selectNodeContents(divRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      const selection = document.getSelection();

      if (!selection || selection.rangeCount === 0) {
        console.error("No content selected to copy");
        return;
      }

      const range = selection.getRangeAt(0);
      const docFragment = range.cloneContents();

      const clipboardItem = new ClipboardItem({
        "text/html": new Blob(
          [new XMLSerializer().serializeToString(docFragment)],
          { type: "text/html" }
        ),
      });

      await navigator.clipboard.write([clipboardItem]);
      console.log("Content copied to clipboard");
    } catch (error) {
      console.error("Failed to copy content: ", error);
    }
  };

  const copyAllContentToClipboard = async () => {
    selectAllContent();
    await copyToClipboard();
  };

  return (
    <Button onClick={copyAllContentToClipboard} disabled={isDisabled}>
      Copy to Clipboard
    </Button>
  );
};

export default CopytoClipboardButton;
