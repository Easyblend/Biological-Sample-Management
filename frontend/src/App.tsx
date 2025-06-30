import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BioSamples from "./pages/BioSamples";
import Details from "./pages/Details";
import Nav from "./components/Nav";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/samples/:id" element={<Details />} />
        <Route path="/samples" element={<BioSamples />} />
        <Route path="*" element={<div className="p-4">Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
