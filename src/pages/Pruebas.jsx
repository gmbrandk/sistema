import { RegistroProvider } from "../context/RegistroContext";
import { AnimationProvider } from "../context/AnimationContext";
import CarouselForm from "../components/CarouselForm";

function RegisterPage() {
  return (
    <RegistroProvider>
      <AnimationProvider>
        <div className="app-wrapper">
          <h1>Registrar Ordenes de Servicio</h1>
          <CarouselForm />
        </div>
      </AnimationProvider>
    </RegistroProvider>
  );
}

export default RegisterPage;
