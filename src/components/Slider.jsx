import { useAnimation } from "../context/AnimationContext";
import ClienteForm from "./ClienteForm";
import EquipoForm from "./EquipoForm";
import { useEffect, useState } from "react";
import Modal from "./Modal";

function Slider() {
  const { animationId } = useAnimation();
  const [shouldSlide, setShouldSlide] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado del modal

  useEffect(() => {
    if (animationId) {
      setShouldSlide(true);
    }
  }, [animationId]);

  const handleModalClose = () => {
    setShowModal(false); // Cierra el modal
    setShouldSlide(true); // Inicia la animación
  };
  

  return (
    <div>
      <div className={`slider-container ${shouldSlide ? "slide" : ""}`}>
      <div className={`form-page ${shouldSlide ? "hidden" : ""}`}>
        <ClienteForm  
          setShouldSlide={setShouldSlide} 
          setShowModal={setShowModal}
          showModal={showModal}/>
      </div>
      <div className={`form-page ${!shouldSlide ? "hidden" : ""}`}>
        <EquipoForm clienteId={animationId} />
      </div>

     
    </div>
     <Modal 
     showModal={showModal} 
     closeModal={handleModalClose} />
    </div>
    
  );
}

export default Slider;
