import React, { useState } from 'react';
import { motion } from 'framer-motion';
import "../styles/carousel.css";

const FormCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const forms = [
    <form key="form1">
      <h2>Formulario 1</h2>
      <input type="text" placeholder="Nombre" />
      <button type="submit">Enviar</button>
    </form>,
    <form key="form2">
      <h2>Formulario 2</h2>
      <input type="email" placeholder="Correo Electrónico" />
      <button type="submit">Enviar</button>
    </form>,
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % forms.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? forms.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      {currentIndex === 0 ? (
        <div className="form-slide">
          {forms[currentIndex]}
        </div>
      ) : (
        <motion.div
          key={currentIndex}
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -1000, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="form-slide"
        >
          {forms[currentIndex]}
        </motion.div>
      )}

      <div className="buttons-container">
        <button onClick={prevSlide}>Anterior</button>
        <button onClick={nextSlide}>Siguiente</button>
      </div>
    </div>
  );
};

export default FormCarousel;
