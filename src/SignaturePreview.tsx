import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import CopytoClipboardButton from "./CopytoClipboardButton";
import DynamicForm from "./DynamicForm";
import extractIdAndClass from "./utils/extractIdandClass";
import parseCssString from "./utils/parseCssString";

interface SignatureEditorProps {
  tableHtml: string;
}

interface EditableFieldObj {
  id: string;
  class: string;
}

const SignaturePreview = ({ tableHtml }: SignatureEditorProps) => {
  const divRef = useRef<HTMLDivElement>(null);
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
            <span id={domNode.attribs.id} style={style}>
              {changedField.value}
            </span>
          );
        }
      }
    },
  };

  useEffect(() => {
    const idClassArray = extractIdAndClass(tableHtml);
    setEditableFields(idClassArray);
    setHtmlContent(tableHtml);
    // Initialize previous values
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
    <div>
      <div ref={divRef}>{parse(htmlContent, options)}</div>
      <DynamicForm
        fields={editableFields}
        onFieldChange={handleFieldChange}
        initialValues={previousValues} // Pass initial values here
      />

      <div className="pt-5">
        <CopytoClipboardButton divRef={divRef} />
      </div>
    </div>
  );
};

export default SignaturePreview;
