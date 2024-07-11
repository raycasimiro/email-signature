import { Button } from "@/components/ui/button";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { CSSProperties, useRef } from "react";
import parseStyle from "style-to-object"; // Renamed import
import "./App.css";
import EditableField from "./components/EditableField";
import { plainCssToReact } from "./utils/caseConverter";

const content = `<table
      id="zs-output-sig"
      border="0"
      cellpadding="0"
      cellspacing="0"
      style="
        font-family: Arial, Helvetica, sans-serif;
        line-height: 0px;
        font-size: 1px;
        padding: 0px !important;
        border-spacing: 0px;
        margin: 0px;
        border-collapse: collapse;
        width: 550px;
      "
    >
      <tbody>
        <tr>
          <td style="padding: 0px !important">
            <table
              id="inner-table"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                font-family: Arial, Helvetica, sans-serif;
                line-height: 0px;
                font-size: 1px;
                padding: 0px !important;
                border-spacing: 0px;
                margin: 0px;
                border-collapse: collapse;
              "
            >
              <tbody>
                <tr>
                  <td
                    style="
                      border-collapse: collapse;
                      font-family: Arial, Helvetica, sans-serif;
                      font-size: 14px;
                      font-style: normal;
                      line-height: 16px;
                      font-weight: 400;
                      padding-bottom: 14px;
                    "
                  >
                    <p style="margin: 0.04px" id="signoff">
                      <span
                        class="text"
                        style="
                          font-family: Arial, Helvetica, sans-serif;
                          font-size: 14px;
                          font-style: normal;
                          line-height: 16px;
                          font-weight: 400;
                          color: #1b2130;
                          display: inline;
                        "
                        >Kind Regards,</span
                      >
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 0px !important">
            <table
              id="inner-table"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                font-family: Arial, Helvetica, sans-serif;
                line-height: 0px;
                font-size: 1px;
                padding: 0px !important;
                border-spacing: 0px;
                margin: 0px;
                border-collapse: collapse;
              "
            >
              <tbody>
                <tr>
                  <td style="padding: 0px !important">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr style="text-align: left;">
                          <td
                            style="
                              border-collapse: collapse;
                              font-family: Arial, Helvetica, sans-serif;
                              font-size: 22px;
                              font-style: normal;
                              line-height: 24px;
                              font-weight: 700;
                              padding-bottom: 4px;
                              text-align: left;
                            "
                          >
                            <p style="margin: 0.04px;text-align: left;">
                              <span
                                id="name" 
                                class="text"
                                style="
                                  font-family: Arial, Helvetica, sans-serif;
                                  font-size: 22px;
                                  font-style: normal;
                                  line-height: 24px;
                                  font-weight: 700;
                                  color: #1b2130;
                                  display: inline;
                                "
                                >Ray Casimiro</span
                              >
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              font-family: Arial, Helvetica, sans-serif;
                              font-size: 13px;
                              font-style: bold;
                              line-height: 17px;
                              font-weight: 700;
                              padding-bottom: 8px;
                              text-align: left;
                            "
                          >
                            <p style="margin: 0.04px; text-align: left;">
                              <span
                                id="job-title"
                                class="text"
                                style="
                                  font-family: Arial, Helvetica, sans-serif;
                                  font-size: 13px;
                                  font-style: bold;
                                  line-height: 17px;
                                  font-weight: 700;
                                  color: #8891a7;
                                  display: inline;
                                "
                                >LORD OF DESIGN</span
                              >
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        /* line-height: 0px;
                        font-size: 1px; */
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              padding-bottom: 10px;
                              padding-right: 1px;
                              width: 60px;
                            "
                          >
                            <hr
                              style="
                                border: 0;
                                height: 3px;
                                background-color: #c63dad;
                                color: #c63dad;
                              "
                            />
                            <p style="margin: 0.04px"></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td style="padding-right: 10px">
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                font-family: Arial, Helvetica, sans-serif;
                                line-height: 0px;
                                font-size: 1px;
                                padding: 0px !important;
                                border-spacing: 0px;
                                margin: 0px;
                                border-collapse: collapse;
                              "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      border-collapse: collapse;
                                      line-height: 0px;
                                      padding-bottom: 6px;
                                      padding-right: 5px;
                                    "
                                  >
                                    <p style="margin: 0.04px">
                                      <img
                                        height="17"
                                        width="17"
                                        alt="image"
                                        border="0"
                                        src="https://subble-public-assets.s3.us-west-2.amazonaws.com/assets/email/email-icon.png"
                                      />
                                    </p>
                                  </td>
                                  <td
                                    style="
                                      border-collapse: collapse;
                                      line-height: 0px;
                                      padding-bottom: 6px;
                                      padding-right: 1px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0.04px;                                 
                                      "
                                    >
                                      <a
                                        class="link"
                                        href="mailto:ray@subble.com"
                                        target="_blank"
                                        rel="nofollow"
                                        style="
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 14px;
                                          font-style: normal;
                                          line-height: 16px;
                                          font-weight: 400;
                                          color: #8891a7;
                                          display: inline;
                                          text-decoration: none;
                                        "
                                        >ray@subble.com</a
                                      >
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td style="padding: 0px !important">
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                font-family: Arial, Helvetica, sans-serif;
                                line-height: 0px;
                                font-size: 1px;
                                padding: 0px !important;
                                border-spacing: 0px;
                                margin: 0px;
                                border-collapse: collapse;
                              "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      border-collapse: collapse;
                                      line-height: 0px;
                                      padding-bottom: 6px;
                                      padding-right: 5px;
                                    "
                                  >
                                    <p style="margin: 0.04px">
                                      <img
                                        height="17"
                                        width="17"
                                        alt="image"
                                        border="0"
                                        src="https://subble-public-assets.s3.us-west-2.amazonaws.com/assets/email/website-icon.png"
                                      />
                                    </p>
                                  </td>
                                  <td
                                    style="
                                      border-collapse: collapse;
                                      line-height: 0px;
                                      padding-bottom: 6px;
                                      padding-right: 1px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0.04px;
                                        text-decoration: none;
                                      "
                                    >
                                      <a
                                        class="link"
                                        href="https://www.subble.com/"
                                        target="_blank"
                                        rel="nofollow"
                                        style="
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 14px;
                                          font-style: normal;
                                          line-height: 16px;
                                          font-weight: 400;
                                          color: #8891a7;
                                          display: inline;
                                          text-decoration: none;
                                        "
                                        >www.subble.com</a
                                      >
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td style="padding: 10px 0 15px">
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                font-family: Arial, Helvetica, sans-serif;
                                line-height: 0px;
                                font-size: 1px;
                                padding: 0px !important;
                                border-spacing: 0px;
                                margin: 0px;
                                border-collapse: collapse;
                              "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      vertical-align: middle;
                                      overflow: hidden;
                                      max-width: 120px;
                                      padding: 0px 0px 0px 0px;
                                    "
                                  >
                                    <img
                                      src="https://subble-public-assets.s3.us-west-2.amazonaws.com/assets/subble-horizontal-email-600.png"
                                      alt="Subble logo"
                                      style="
                                        display: block;
                                        width: 100%;
                                        height: auto;
                                        max-width: 120px;
                                      "
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td style="padding-right: 15px">
                            <p style="margin: 0.04px">
                              <a
                                style="
                                  font-size: 0px;
                                  line-height: 0px;
                                  text-decoration: none;
                                "
                                target="_blank"
                                rel="nofollow"
                                href="https://www.linkedin.com/company/subble/"
                              >
                                <img
                                  height="30"
                                  width="30"
                                  alt="facebook"
                                  border="0"
                                  src="https://subble-public-assets.s3.us-west-2.amazonaws.com/assets/email/in-logo.png"
                                />
                              </a>
                            </p>
                          </td>
                          <td style="padding-right: 15px">
                            <p style="margin: 0.04px">
                              <a
                                style="
                                  font-size: 0px;
                                  line-height: 0px;
                                  text-decoration: none;
                                "
                                target="_blank"
                                rel="nofollow"
                                href="https://www.youtube.com/@subble_app"
                              >
                                <img
                                  height="30"
                                  width="30"
                                  alt="twitter"
                                  border="0"
                                  src="https://subble-public-assets.s3.us-west-2.amazonaws.com/assets/email/yt-logo.png"
                                />
                              </a>
                            </p>
                          </td>
                          <td style="padding: 0px !important"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="border-collapse: collapse; padding-bottom: 16px">
            <span></span>
          </td>
        </tr>
      </tbody>
    </table>
`;

const SignatureEditor = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const getStyleObject = (style: string): CSSProperties | undefined => {
    const parsedStyle = plainCssToReact(style);
    return parseStyle(parsedStyle) || undefined;
  };

  const replaceDomNode = (domNode: Element, placeholder: string) => {
    const styleObject = getStyleObject(domNode.attribs.style);
    return <EditableField placeholder={placeholder} style={styleObject} />;
  };

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        if (
          domNode.attribs.class === "text" ||
          domNode.attribs.class === "link"
        ) {
          console.log(domNode.attribs);
          return replaceDomNode(domNode, "Input text");
        }
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
    <div>
      <div ref={divRef}>{parse(content, options)}</div>

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
        <SignatureEditor />
      </div>
    </div>
  );
}

export default App;
