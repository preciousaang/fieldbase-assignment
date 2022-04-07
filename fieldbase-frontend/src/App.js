import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddGateway from "./pages/AddGateway";
import SingleGateway from "./pages/SingleGateway";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/add-gateway" element={<AddGateway />} />
        <Route path="gateway/:id" element={<SingleGateway />} />
      </Routes>
    </div>
  );
}

export default App;
