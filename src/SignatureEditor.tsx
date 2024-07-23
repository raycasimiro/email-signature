import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { LifeBuoy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ModeToggle } from "./components/ModeToggle";
import { ScrollArea } from "./components/ui/scroll-area";
import CopytoClipboardButton from "./CopytoClipboardButton";
import DynamicForm from "./DynamicForm";
import EditableField from "./EditableField";
import extractIdAndClass from "./utils/extractIdandClass";
import parseCssString from "./utils/parseCssString";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SignatureEditorProps {
  tableHtml: string;
}

interface EditableFieldObj {
  id: string;
  class: string;
}

const SignatureEditor = ({ tableHtml }: SignatureEditorProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>(tableHtml);
  const [editableFields, setEditableFields] = useState<EditableFieldObj[]>([]);
  const [changedField, setChangedField] = useState<{
    id: string;
    value: string;
  }>({ id: "", value: "" });
  const [previousValues, setPreviousValues] = useState<{
    [key: string]: string;
  }>({});

  const handleFieldChange = (id: string, value: string) => {
    setChangedField({ id, value });
    if (divRef.current) {
      const element = divRef.current.querySelector(`#${id}`);
      if (element) {
        element.innerHTML = value;
        setHtmlContent(divRef.current.innerHTML);
      }
    }
  };

  const options: HTMLReactParserOptions = {
    trim: true,
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs.id) {
        if (
          editableFields.some(
            (obj) =>
              obj.id === domNode.attribs.id &&
              changedField.id === domNode.attribs.id
          )
        ) {
          const style = parseCssString(domNode.attribs.style);
          return (
            <EditableField
              id={domNode.attribs.id}
              type={domNode.attribs.class}
              style={style}
              value={changedField.value}
            />
          );
        }
      }
    },
  };

  const handleValidationStatusChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  useEffect(() => {
    const idClassArray = extractIdAndClass(tableHtml);
    setEditableFields(idClassArray);
    setHtmlContent(tableHtml);
    const initialValues: { [key: string]: string } = {};
    idClassArray.forEach(({ id }) => {
      const element = divRef.current?.querySelector(`#${id}`);
      if (element) {
        initialValues[id] = element.innerHTML;
      }
    });
    setPreviousValues(initialValues);
  }, [tableHtml]);

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="">
          <ScrollArea className="h-[600px] w-[340px] rounded-tl-md rounded-bl-md border-0 bg-slate-700 text-white">
            <div className="p-6">
              <h2 className="font-inter font-semibold">Signature details</h2>
            </div>
            <div className="p-6">
              <DynamicForm
                fields={editableFields}
                onFieldChange={handleFieldChange}
                initialValues={previousValues}
                onValidationStatusChange={handleValidationStatusChange}
              />
            </div>
          </ScrollArea>
        </div>
        <div className="flex flex-col justify-between w-fit max-w-[640px] h-[600px] bg-white dark:bg-slate-800 rounded-tr-md rounded-br-md">
          <div className="p-6">
            <h2 className="font-semibold font-inter pb-1">
              Subble template v1
            </h2>
            <p className="text-sm font-inter text-slate-500">
              Email signature for Subble emails.
            </p>
          </div>
          <div className="pb-6 pl-6 pr-6 h-full">
            <div>
              <p className="text-left text-gray-400 dark:text-gray-600 text-[14px] leading-[25px] mb-2 font-arial">
                Hello User,
              </p>
              <p className="text-left text-gray-400 dark:text-gray-600 text-[14px] leading-[25px] font-arial pb-10">
                This is a sample text to show how your email signature will
                appear with an email body. Click the{" "}
                <strong>Copy to clipboard</strong> button to copy the signature
                below.
              </p>
            </div>
            <div className="select-none" ref={divRef}>
              {parse(htmlContent, options)}
            </div>
          </div>

          <div className="flex justify-between p-6 border-t border-gray-200 dark:border-slate-700">
            <ModeToggle />
            <div className="flex gap-3 justify-center items-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="bg-slate-300 hover:bg-slate-600 dark:bg-slate-700 dark:hover:bg-slate-400 w-[36px] h-[36px] flex justify-center items-center rounded-full p-0">
                    <LifeBuoy
                      color="#ffffff"
                      strokeWidth={1.25}
                      className="w-[24px] h-[24px]"
                    />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="min-w-[520px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      How to setup your email signature in Gmail
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="min-w-[293px]">
                        <img
                          src="https://storage.googleapis.com/support-kms-prod/yL4gtsrPqsbSYvjhIboxiUu7sW6TAIcih7Yc"
                          alt=""
                        />
                      </div>

                      <ol className="list-decimal list-outside flex flex-col gap-4 pt-4 pl-4">
                        <li>
                          After entering your signature details, click the
                          <strong> Copy to clipboard</strong> button
                        </li>
                        <li>
                          Sign into Gmail and click the{" "}
                          <strong>gear icon</strong> in the upper right.
                        </li>
                        <li>
                          Click <strong>See all settings</strong>
                        </li>
                        <li>
                          Scroll down to the <strong>Signature</strong> section
                          and click <strong>Create new</strong>
                        </li>
                        <li>
                          Type in a name and click <strong>Create</strong>
                        </li>
                        <li>
                          Click into the signature dialog box and then{" "}
                          <strong>Paste</strong> (Ctrl-V)
                        </li>
                        <li>
                          Set your signature to be used for both{" "}
                          <strong> new emails </strong>
                          and on <strong>replies/forward</strong>, and hit the
                          “Insert signature before quoted text…” checkbox.
                        </li>
                        <li>
                          Scroll down to the bottom of the “Settings” page and
                          click <strong>Save changes</strong>
                        </li>
                      </ol>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Got it!</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {isFormValid ? (
                <CopytoClipboardButton divRef={divRef} />
              ) : (
                <CopytoClipboardButton divRef={divRef} isDisabled={true} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureEditor;
