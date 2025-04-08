import { ClienteProvider, useCliente } from "./context/ClienteContext";
import ClienteForm from "./components/ClienteForm";
import EquipoForm from "./components/EquipoForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

function Slider() {
  const { clienteId } = useCliente();

  return (
    <div className={`slider-container ${clienteId ? "slide" : ""}`}>
      {/* Formulario de Cliente */}
      <div className={`form-page ${clienteId ? "hidden" : ""}`}>
        <ClienteForm />
      </div>
      {/* Formulario de Equipo */}
      <div className={`form-page ${!clienteId ? "hidden" : ""}`}>
        <EquipoForm clienteId={clienteId}/>
      </div>
    </div>
  );
}

function App() {
  return (
    <ClienteProvider>
      <div className="app-wrapper">
        <h1>Registro de Cliente y Equipo</h1>
        <Slider />
        <Dashboard />
      </div>
    </ClienteProvider>
  );
}

export default App;
