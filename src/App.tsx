import { Button } from "@/components/ui/button";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import DynamicForm from "./DynamicForm";
import content from "./templates/basic";
import extractIdAndClass from "./utils/extractIdandClass";

interface SingnatureEditorProps {
  tableHtml: string;
}

interface EditableFieldObj {
  id: string;
  class: string;
}

const SignatureEditor = ({ tableHtml }: SingnatureEditorProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [editableFields, setEditableFields] = useState<EditableFieldObj[]>([]);
  const [changedField, setChangedField] = useState<{
    id: string;
    value: string;
  }>({ id: "", value: "" });

  const handleFieldChange = (id: string, value: string) => {
    setChangedField({ id, value });
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
        )
          return <span>{changedField.value}</span>;
      }
    },
  };

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
    console.log(editableFields);
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

  useEffect(() => {
    const idClassArray = extractIdAndClass(tableHtml);
    setEditableFields(idClassArray);
  }, [tableHtml]);

  return (
    <div>
      <div ref={divRef}>{parse(tableHtml, options)}</div>
      <DynamicForm fields={editableFields} onFieldChange={handleFieldChange} />
      <div className="pt-5">
        <Button onClick={copyAllContentToClipboard}>Copy to Clipboard</Button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-fit h-fit p-5 bg-white rounded-md shadow-md">
        <SignatureEditor tableHtml={content} />
      </div>
    </div>
  );
}

export default App;
