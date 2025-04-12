import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCliente } from "../context/ClienteContext";
import ClienteFormVisual from "../components/ClienteFormVisual";
import EquipoFormVisual from "../components/EquipoFormVisual";
import styles from "../styles/formCarousel.module.css";

const CarouselForm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  const { clienteId } = useCliente();

  const forms = [
    {
      id: "cliente",
      component: <ClienteFormVisual />,
      variants: {
        enter: { x: "0%", opacity: 1, position: "relative" },
        center: { x: "0%", opacity: 1, position: "relative" },
        exit: { x: "-100%", opacity: 0, position: "absolute" }
      }
    },
    {
      id: "equipo",
      component: <EquipoFormVisual />,
      variants: {
        enter: { x: "100%", opacity: 0, position: "absolute" },
        center: { x: "0%", opacity: 1, position: "relative" },
        exit: { x: "100%", opacity: 0, position: "absolute" }
      }
    }
  ];

  const nextSlide = () => {
    if (currentIndex < forms.length - 1) {
      const newIndex = currentIndex + 1;
      console.log("➡️ [Carousel] Botón siguiente, cambiando a índice:", newIndex);
      setDirection(1);
      setCurrentIndex(newIndex);
      localStorage.setItem("carouselIndex", newIndex);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      console.log("⬅️ [Carousel] Botón atrás, cambiando a índice:", newIndex);
      setDirection(-1);
      setCurrentIndex(newIndex);
      localStorage.setItem("carouselIndex", newIndex);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const storedIndex = localStorage.getItem("carouselIndex");
    const storedClienteId = localStorage.getItem("clienteId");
    console.log("📦 [Carousel] Montando componente...");
    console.log("📦 Índice guardado:", storedIndex);
    console.log("📦 clienteId guardado:", storedClienteId);

    if (storedIndex !== null) {
      setCurrentIndex(parseInt(storedIndex, 10));
    }
  }, []);

  useEffect(() => {
    console.log("🎯 [Carousel] clienteId cambió:", clienteId);
    if (clienteId && currentIndex === 0) {
      console.log("✅ clienteId detectado. Avanzando al formulario de equipo...");
      nextSlide();
    } else if (!clienteId && currentIndex === 1) {
      console.log("⚠️ clienteId es null pero estamos en paso 1. Regresando a cliente...");
      prevSlide();
    }
  }, [clienteId]);

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
