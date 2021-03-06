import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import AddGateway from "./pages/AddGateway";
import SingleGateway from "./pages/SingleGateway";
import Gateways from "./pages/Gateways";
import { NavBar } from "./shared/styledComps";

function App() {
  return (
    <div className="App">
      <NavBar>
        <li>
          <Link to="/gateways">List gateways</Link>
        </li>
        <li>
          <Link to="/add-gateway">Add Gateway</Link>
        </li>
      </NavBar>
      <Routes>
        <Route path="/add-gateway" element={<AddGateway />} />
        <Route path="/gateway/:id" element={<SingleGateway />} />
        <Route path="/gateways" element={<Gateways />} />
      </Routes>
    </div>
  );
}

export default App;
