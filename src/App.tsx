import "./App.css";
import SignatureEditor from "./SignaturePreview";
import content from "./templates/basic";

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
