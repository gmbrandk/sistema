import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRegistro } from "../context/RegistroContext";
import ClienteFormVisual from "../components/ClienteFormVisual";
import EquipoFormVisual from "../components/EquipoFormVisual";
import OrdenServicioForm from "../components/OrdenServicioForm";
import styles from "../styles/formCarousel.module.css";

const CarouselForm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  const { clienteId, equipoId } = useRegistro();

  const forms = [
    { id: "cliente", component: <ClienteFormVisual /> },
    { id: "equipo", component: <EquipoFormVisual /> },
    { id: "orden", component: <OrdenServicioForm /> }
  ];

  // 🔁 Posicionamiento dinámico con respecto al índice actual
  const getSlideVariants = (index) => {
    const offset = (index - currentIndex) * 100;
    return {
      enter: {
        x: `${offset}%`,
        opacity: 0,
        position: "absolute"
      },
      center: {
        x: "0%",
        opacity: 1,
        position: "relative"
      },
      exit: {
        x: `${offset}%`,
        opacity: 0,
        position: "absolute"
      }
    };
  };

  const nextSlide = () => {
    if (currentIndex < forms.length - 1) {
      const newIndex = currentIndex + 1;
      setDirection(1);
      setCurrentIndex(newIndex);
      localStorage.setItem("carouselIndex", newIndex);
      console.log(`Siguiente slide: índice actual ${currentIndex} -> nuevo índice ${newIndex}, dirección: derecha`);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setDirection(-1);
      setCurrentIndex(newIndex);
      localStorage.setItem("carouselIndex", newIndex);
      //console.log(`Anterior slide: índice actual ${currentIndex} -> nuevo índice ${newIndex}, dirección: izquierda`);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const storedIndex = localStorage.getItem("carouselIndex");
    if (storedIndex !== null) {
      setCurrentIndex(parseInt(storedIndex, 10));
    }
  }, []);

  useEffect(() => {
    console.log("[DEBUG] clienteId:", clienteId);
    console.log("[DEBUG] equipoId:", equipoId);
    console.log("[DEBUG] currentIndex:", currentIndex);
  
    switch (currentIndex) {
      case 0:
        if (clienteId) {
          console.log("[ANIMACIÓN] Cliente registrado → avanzar a formulario de equipo");
          nextSlide();
        }
        break;
  
      case 1:
        if (!clienteId) {
          console.log("[ANIMACIÓN] Cliente eliminado → volver a formulario de cliente");
          prevSlide();
        } else if (equipoId) {
          console.log("[ANIMACIÓN] Equipo registrado → avanzar a formulario de orden");
          nextSlide();
        }
        break;
  
      case 2:
        if (!equipoId) {
          console.log("[ANIMACIÓN] Equipo eliminado → volver a formulario de equipo");
          prevSlide();
        }
        break;
  
      default:
        break;
    }
  }, [clienteId, equipoId, currentIndex]);
  
  

  return (
    <div className={styles.carouselContainer}>
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className={`${styles.carouselArrow} ${styles.left}`}
      >
        ←
      </button>

      <div className={styles.carouselInner}>
        <p style={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
          Paso actual (debug): {currentIndex}
        </p>

        {forms.map((form, index) => {
          const isActive = index === currentIndex;
          const relativeX = `${(index - currentIndex) * 100}%`;

          // Log para ver posición de cada formulario
          //console.log(`Formulario ${form.id} renderizado: ${isActive ? 'activo' : 'no activo'}, x: ${relativeX}`);

          return (
            <motion.div
              key={form.id}
              custom={index}
              variants={getSlideVariants(index)}
              initial={isMounted ? (isActive ? "center" : "enter") : "enter"}
              animate={isActive ? "center" : "exit"}
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`${styles.carouselItem} ${isActive ? styles.carouselItemActive : ""}`}
            >
              {form.component}
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={nextSlide}
        disabled={currentIndex === forms.length - 1}
        className={`${styles.carouselArrow} ${styles.right}`}
      >
        →
      </button>
    </div>
  );
};

export default CarouselForm;
