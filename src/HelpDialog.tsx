import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LifeBuoy } from "lucide-react";

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-1">
          <LifeBuoy strokeWidth={1.25} />
          Help
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] dark:bg-slate-800">
        <DialogHeader>
          <DialogTitle className="font-inter text-[16px] font-semibold">
            How to setup your email signature in Gmail
          </DialogTitle>
        </DialogHeader>
        <div className="max-w-[420px] min-w-[420px] min-h-[263px]  py-2">
          <img
            src="https://storage.googleapis.com/support-kms-prod/yL4gtsrPqsbSYvjhIboxiUu7sW6TAIcih7Yc"
            alt=""
          />
        </div>
        <ol className="list-decimal list-outside flex flex-col gap-4 pl-4 text-sm font-inter">
          <li>
            After entering your signature details, click the
            <strong> Copy to clipboard</strong> button
          </li>
          <li>
            Sign into Gmail and click the <strong>gear icon</strong> in the
            upper right.
          </li>
          <li>
            Click <strong>See all settings</strong>
          </li>
          <li>
            Scroll down to the <strong>Signature</strong> section and click{" "}
            <strong>Create new</strong>
          </li>
          <li>
            Type in a name and click <strong>Create</strong>
          </li>
          <li>
            Click into the signature dialog box and then <strong>Paste</strong>{" "}
            (Ctrl-V)
          </li>
          <li>
            Set your signature to be used for both <strong> new emails </strong>
            and on <strong>replies/forward</strong>, and hit the “Insert
            signature before quoted text…” checkbox.
          </li>
          <li>
            Scroll down to the bottom of the “Settings” page and click{" "}
            <strong>Save changes</strong>
          </li>
        </ol>
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant={"outline"} className="dark:bg-slate-600">
              Okay, got it
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
