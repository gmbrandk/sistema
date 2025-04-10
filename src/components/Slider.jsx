import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import ClienteForm from "./ClienteForm";
import EquipoForm from "./EquipoForm";
//import Modal from "./Modal";
//import "../styles/modal.css"; // tus estilos generales
//import "../styles/slider.css"

function Slider() {
  const { animationId } = useAnimation();
  const [shouldSlide, setShouldSlide] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (animationId) {
      setShouldSlide(true);
    }
  }, [animationId]);

  const handleModalClose = () => {
    setShowModal(false);
    setShouldSlide(true);
  };

  return (
    <div className="slider-wrapper">
      <AnimatePresence mode="wait">
        {!shouldSlide && (
          <motion.div
            key="clienteForm"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className="form-page"
          >
            <ClienteForm
              setShouldSlide={setShouldSlide}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          </motion.div>
        )}

        {shouldSlide && (
          <motion.div
            key="equipoForm"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="form-page"
          >
            <EquipoForm clienteId={animationId} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal con animación */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h3>Formulario enviado con éxito!</h3>
              <button onClick={handleModalClose}>Cerrar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Slider;
