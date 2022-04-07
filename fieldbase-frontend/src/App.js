import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddGateway from "./pages/AddGateway";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/add-gateway" element={<AddGateway />} />
      </Routes>
    </div>
  );
}

export default App;
