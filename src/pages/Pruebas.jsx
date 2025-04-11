import { useState } from "react";
import { motion } from "framer-motion";
import ClienteFormVisual from "../components/ClienteFormVisual";
import EquipoFormVisual from "../components/EquipoFormVisual";
import styles from "../styles/carousel.module.css";

const FormCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 adelante, -1 atrás

  const forms = [
    { id: 0, component: <ClienteFormVisual /> },
    { id: 1, component: <EquipoFormVisual /> }
  ];

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

  return (
    <div className={styles.carouselContainer}>
      <button onClick={prevSlide} disabled={currentIndex === 0} className={`${styles.carouselArrow} ${styles.left}`}>←</button>
      {forms.map((form, index) => {
        const isActive = index === currentIndex;
        return (
          <motion.div
            key={form.id}
            initial={{ x: direction > 0 ? "100%" : "-100%" }}
            animate={isActive ? { x: "0%" } : { x: direction > 0 ? "-100%" : "100%" }}
            exit={{ x: direction > 0 ? "-100%" : "100%" }}
            transition={{ duration: 0.5 }}
            className={styles.carouselItem}
          >
            {form.component}
          </motion.div>
        );
      })}
      <button onClick={nextSlide} disabled={currentIndex === forms.length - 1} className={`${styles.carouselArrow} ${styles.right}`}>→</button>
    </div>
  );
};

export default FormCarousel;
