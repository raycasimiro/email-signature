import { CircleAlert, CircleCheck, ClipboardCopy } from "lucide-react";
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
      if (!divRef.current) {
        console.error("No content to copy");
        return;
      }

      const htmlContent = divRef.current.innerHTML;

      if (navigator.clipboard && window.ClipboardItem) {
        const clipboardItem = new ClipboardItem({
          "text/html": new Blob([htmlContent], { type: "text/html" }),
        });

        await navigator.clipboard.write([clipboardItem]);
        toast({
          variant: "success",
          title: (
            <div className="flex items-center gap-1">
              <CircleCheck className="text-white" />{" "}
              <span className="font-inter">Copied to clipboard</span>
            </div>
          ),
        });
      } else {
        // Fallback for browsers that do not support ClipboardItem
        if (divRef.current) {
          const range = document.createRange();
          range.selectNodeContents(divRef.current);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          document.execCommand("copy");
          selection?.removeAllRanges();
          toast({
            variant: "success",
            title: (
              <div className="flex items-center gap-1">
                <CircleCheck className="text-white" />{" "}
                <span className="font-inter">Copied to clipboard</span>
              </div>
            ),
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-1">
            <CircleAlert className="text-white" />{" "}
            <span className="font-inter">Copy to clipboard failed</span>
          </div>
        ),
      });
    }
  };

  const copyAllContentToClipboard = async () => {
    selectAllContent();
    await copyToClipboard();
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
