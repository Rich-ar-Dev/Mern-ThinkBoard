import { Route, Routes } from "react-router-dom";  // ← Make sure this is also changed
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradiend (125%_125%_at_50%_10,#000_60%,#00FF9D40_100%)]" />
    {/* <button className="btn btn-neutral">Neutral</button>
    <button className="btn btn-primary">Primary</button>
    <button className="btn btn-secondary">Secondary</button>
    <button className="btn btn-accent">Accent</button>
    <button className="btn btn-ghost">Ghost</button>
    <button className="btn btn-link">Link</button> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;