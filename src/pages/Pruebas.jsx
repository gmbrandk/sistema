import { ClienteProvider } from "../context/ClienteContext";
import { AnimationProvider } from "../context/AnimationContext";
import CarouselForm from "../components/CarouselForm";

function RegisterPage() {
  return (
    <ClienteProvider>
      <AnimationProvider>
        <div className="app-wrapper">
          <h1>Registrar Ordenes de Servicio</h1>
          <CarouselForm />
        </div>
      </AnimationProvider>
    </ClienteProvider>
  );
}

export default RegisterPage;
