import { CircleCheck, ClipboardCopy } from "lucide-react";
import React from "react";
import { Button } from "./components/ui/button";
import { useToast } from "./components/ui/use-toast";

interface ClipboardProps {
  divRef: React.RefObject<HTMLDivElement>;
  isDisabled?: boolean;
}

const CopytoClipboardButton: React.FC<ClipboardProps> = ({
  divRef,
  isDisabled,
}) => {
  const { toast } = useToast();
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
    toast({
      variant: "success",
      title: (
        <div className="flex items-center gap-1">
          <CircleCheck className="text-white" />{" "}
          <span className="font-inter">Copied to clipboard</span>
        </div>
      ),
    });
  };

  return (
    <Button
      onClick={copyAllContentToClipboard}
      disabled={isDisabled}
      className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-400 dark:hover:bg-orange-200 disabled:bg-gray-500 dark:disabled:bg-gray-500"
    >
      <ClipboardCopy className="h-[1.2rem] w-[1.2rem] mr-1" />
      Copy to clipboard
    </Button>
  );
};

export default CopytoClipboardButton;
