import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import SignaturePreview from "./SignatureEditor";
import content from "./templates/basic";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-screen">
        <SignaturePreview tableHtml={content} />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
