import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ModeToggle } from "./components/ModeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import CopytoClipboardButton from "./CopytoClipboardButton";
import DynamicForm from "./DynamicForm";
import EditableField from "./EditableField";
import extractIdAndClass from "./utils/extractIdandClass";
import parseCssString from "./utils/parseCssString";

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
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={20}
          minSize={10}
          maxSize={30}
          className="bg-slate-700 p-6 text-white border-0 pt-16"
        >
          <DynamicForm
            fields={editableFields}
            onFieldChange={handleFieldChange}
            initialValues={previousValues}
            onValidationStatusChange={handleValidationStatusChange}
          />
        </ResizablePanel>
        {/* <ResizableHandle /> */}
        <ResizablePanel>
          <div className="flex justify-center items-center h-full">
            <Card className="w-[600px] dark:bg-slate-900">
              <CardHeader>
                <CardTitle>Basic Signature</CardTitle>
                <CardDescription>
                  The most basic signature template ever
                </CardDescription>
              </CardHeader>
              <CardContent className="select-none">
                <div>
                  <p className="text-left text-gray-400 dark:text-gray-600 text-[14px] leading-[25px] mb-2">
                    Hello User,
                  </p>
                  <p className="text-left text-gray-400 dark:text-gray-600 text-[14px] leading-[25px]">
                    This is a sample text to show how your email signature will
                    appear with an email body. Click the{" "}
                    <strong>Copy to clipboard</strong> button to copy the
                    signature below.
                  </p>
                  <br />
                </div>
                <div ref={divRef}>{parse(htmlContent, options)}</div>
              </CardContent>
              <Separator />
              <CardFooter className="flex justify-between pt-6">
                <ModeToggle />
                {isFormValid ? (
                  <CopytoClipboardButton divRef={divRef} />
                ) : (
                  <CopytoClipboardButton divRef={divRef} isDisabled={true} />
                )}
              </CardFooter>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SignatureEditor;
