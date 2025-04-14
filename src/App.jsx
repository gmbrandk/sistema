import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import Pruebas from "./pages/Pruebas";
import OrdenServicioRegistro from "./components/OrdenServicioRegistro";
import OrdenReciente from "./components/OrdenReciente";
import { RegistroProvider } from "./context/RegistroContext"; // Importar el proveedor
import "./App.css";

function App() {
  return (
    <RegistroProvider> {/* Envolver todo con el RegistroProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/testing" element={<Pruebas />} />
          <Route path="/registro" element={<OrdenReciente />} />
          <Route path="/os" element={<OrdenServicioRegistro />} />
        </Routes>
      </Router>
    </RegistroProvider>
  );
}

export default App;
