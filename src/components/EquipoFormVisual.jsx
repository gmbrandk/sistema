import { useState, useEffect } from "react";
import { useRegistro } from "../context/RegistroContext";
import styles from "../styles/formCard.module.css";

const EquipoFormVisual = () => {
  const [formData, setFormData] = useState({
    tipo: "",
    marca: "",
    modelo: "",
    serial: "",
  });

  const [isFormValid, setIsFormValid] = useState(false); // Estado para verificar si el formulario es válido

  const { clienteId, guardarEquipo } = useRegistro();

  // Recuperar datos del localStorage al cargar
  useEffect(() => {
    const storedData = localStorage.getItem("equipoForm");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  // Guardar automáticamente en localStorage cuando el formulario cambia
  useEffect(() => {
    if (Object.values(formData).some((val) => val.trim() !== "")) {
      localStorage.setItem("equipoForm", JSON.stringify(formData));
    }
  }, [formData]);

  // Verificar si el formulario es válido (todos los campos llenos)
  useEffect(() => {
    const isValid = Object.values(formData).every((val) => val.trim() !== "");
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clienteId) {
      alert("Debe registrar un cliente primero.");
      return;
    }

    guardarEquipo(formData, clienteId);

    // Aquí se podría manejar el avance a la siguiente sección del formulario (Orden de Servicio)
    // Para eso puedes actualizar un estado o utilizar algún tipo de navegación.
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Formulario de Equipo</h2>

        {[ 
          { name: "tipo", placeholder: "Tipo de equipo" },
          { name: "marca", placeholder: "Marca" },
          { name: "modelo", placeholder: "Modelo" },
          { name: "serial", placeholder: "Número de serie" }
        ].map(({ name, placeholder }) => (
          <input
            key={name}
            type="text"
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            required
          />
        ))}

        <button type="submit" disabled={!isFormValid}>Siguiente</button>
      </form>
    </div>
  );
};

export default EquipoFormVisual;
