import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[350px] h-fit p-5 bg-white rounded-md shadow-md">
        <h1 className="pb-5 text-left text-xl font-bold">
          Vite + React + TS + shadecn/ui
        </h1>
        <p className="pb-5 text-left">
          Lorem ipsum dolor sit amet. Qui quod dolorum et impedit dolorem quo
          laborum necessitatibus. Vel natus rerum ea libero dolores nam
          cupiditate molestias qui delectus consectetur id magni ullam qui
          debitis rerum.
        </p>
        <Button>Click Me!</Button>
      </div>
    </div>
  );
}

export default App;
