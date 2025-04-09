import { useAnimation } from "../context/AnimationContext";
import ClienteForm from "./ClienteForm";
import EquipoForm from "./EquipoForm";

function Slider() {
  const { clienteId} = useAnimation();
  console.log("ClienteId desde AnimationContext:", clienteId);

  return (
    <div className={`slider-container ${clienteId ? "slide" : ""}`}>
      {/* Formulario de Cliente */}
      <div className={`form-page ${clienteId ? "hidden" : ""}`}>
        <ClienteForm />
      </div>
      {/* Formulario de Equipo */}
      <div className={`form-page ${!clienteId ? "hidden" : ""}`}>
        <EquipoForm clienteId={clienteId} />
      </div>
    </div>
  );
}

export default Slider;
