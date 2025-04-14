import { RegistroProvider } from "../context/RegistroContext";
import { AnimationProvider } from "../context/AnimationContext";
import Slider from "../components/Slider";

function HomePage() {
  return (
    <RegistroProvider>
      <AnimationProvider>
        <div className="app-wrapper">
          <h1>Registro de Cliente y Equipo</h1>
          <Slider />
        </div>
      </AnimationProvider>
    </RegistroProvider>
  );
}

export default HomePage;
