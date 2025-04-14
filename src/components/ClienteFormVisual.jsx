import { useEffect, useState } from "react";
import { useRegistro } from "../context/RegistroContext";
import styles from "../styles/formCard.module.css";

const ClienteFormVisual = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    identificacion: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const { guardarCliente } = useRegistro();

  // Recuperar datos del localStorage al cargar
  useEffect(() => {
    const storedData = localStorage.getItem("clienteForm");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  // Guardar automáticamente en localStorage cuando el formulario cambia
  useEffect(() => {
    if (formData.nombre.trim() !== "") {
      localStorage.setItem("clienteForm", JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    guardarCliente(formData);
   
    // NO limpiamos los campos para mantener la experiencia fluida
    // localStorage.removeItem("clienteForm");
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Formulario de Cliente</h2>

        {[
          { name: "nombre", placeholder: "Nombre" },
          { name: "identificacion", placeholder: "Identificación" },
          { name: "telefono", placeholder: "Teléfono" },
          { name: "email", placeholder: "Correo Electrónico" },
          { name: "direccion", placeholder: "Dirección" },
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

        <button type="submit">Siguiente</button>
      </form>
    </div>
  );
};

export default ClienteFormVisual;
