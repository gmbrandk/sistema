import { ClienteProvider } from "../context/ClienteContext";
import { AnimationProvider } from "../context/AnimationContext";
import Slider from "../components/Slider";

function HomePage() {
  return (
    <ClienteProvider>
      <AnimationProvider>
        <div className="app-wrapper">
          <h1>Registro de Cliente y Equipo</h1>
          <Slider />
        </div>
      </AnimationProvider>
    </ClienteProvider>
  );
}

export default HomePage;
