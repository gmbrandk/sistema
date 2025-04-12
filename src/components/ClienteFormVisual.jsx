import { useEffect, useState } from "react";
import { useCliente } from "../context/ClienteContext";
import styles from "../styles/formCard.module.css";

const ClienteFormVisual = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    identificacion: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const { guardarCliente } = useCliente();

  // Recuperar del localStorage al cargar
  useEffect(() => {
    const storedData = localStorage.getItem("clienteForm");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  // Guardar en localStorage cada vez que cambia el formulario
  useEffect(() => {
    const formCopy = { ...formData };
    if (
      Object.values(formCopy)
        .flat()
        .some((val) => val !== "") &&
        formData.nombre !== ""
    ) {
      localStorage.setItem("clienteForm", JSON.stringify(formCopy));
    }
  }, [formData]);

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteConId = {
      ...formData,
      _id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    console.log("Datos enviados al guardarCliente:", clienteConId);
    guardarCliente(clienteConId);
    setFormData({
      nombre: "",
      identificacion: "",
      telefono: "",
      email: "",
      direccion: "",
    });
    localStorage.removeItem("clienteForm");
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Formulario de Cliente</h2>

        {["nombre", "identificacion", "telefono", "email", "direccion"].map(
          (field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              required
              value={formData[field]}
            />
          )
        )}

        <button>Guardar Cliente</button>
      </form>
    </div>
  );
};

export default ClienteFormVisual;
