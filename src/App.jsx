import { ClienteProvider } from "./context/ClienteContext";
import { AnimationProvider } from "./context/AnimationContext";
import Slider from "./components/Slider";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <ClienteProvider>
      <AnimationProvider>
        <div className="app-wrapper">
          <h1>Registro de Cliente y Equipo</h1>
          <Slider />
          <Dashboard />
        </div>
      </AnimationProvider>
    </ClienteProvider>
  );
}

export default App;
