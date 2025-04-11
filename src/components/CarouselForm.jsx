import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCliente } from "../context/ClienteContext";
import { useAnimation } from "../context/AnimationContext";
import ClienteFormVisual from "../components/ClienteFormVisual";
import EquipoFormVisual from "../components/EquipoFormVisual";
import styles from "../styles/formCarousel.module.css";

const CarouselForm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // Acceso a datos y métodos desde ClienteContext
  const {
    clienteId,
    guardarCliente,
    guardarEquipo,
    resetFlujo
  } = useCliente();

  // Control de animación con AnimationContext
  const { setAnimationId } = useAnimation();

  // Formularios y variantes personalizados por formulario
  const forms = [
    {
      id: "cliente",
      component: <ClienteFormVisual />,
      variants: {
        enter: {
          x: "0%", // Cliente aparece directamente (sin transición horizontal)
          opacity: 1,
          position: "relative"
        },
        center: {
          x: "0%",
          opacity: 1,
          position: "relative"
        },
        exit: {
          x: "-100%", // Cliente se desliza hacia la izquierda
          opacity: 0,
          position: "absolute"
        }
      }
    },
    {
      id: "equipo",
      component: <EquipoFormVisual />,
      variants: {
        enter: {
          x: "100%", // Equipo aparece desde la derecha
          opacity: 0,
          position: "absolute"
        },
        center: {
          x: "0%",
          opacity: 1,
          position: "relative"
        },
        exit: {
          x: "100%", // Sale hacia la derecha (sin retroceder)
          opacity: 0,
          position: "absolute"
        }
      }
    }
  ];

  // Navegación entre formularios
  const nextSlide = () => {
    if (currentIndex < forms.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Control para evitar que la animación inicial sea abrupta
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        {forms.map((form, index) => {
          const isActive = index === currentIndex;

          return (
            <motion.div
              key={form.id}
              custom={direction}
              variants={form.variants}
              initial={isMounted ? (isActive ? "center" : false) : "enter"}
              animate={isActive ? "center" : "exit"}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={styles.carouselItem}
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
