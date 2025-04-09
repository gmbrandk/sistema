import { useState, useEffect } from "react";
import { useCliente } from "../context/ClienteContext";
import "../styles/forms.css";

const ClienteForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    identificacion: "",
    telefono: "",
    email: "",
    direccion: ""
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
    // Solo actualizar localStorage si los datos no están vacíos
    if (Object.values(formData).some(val => val !== "")) {
      localStorage.setItem("clienteForm", JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteConId = { ...formData, _id: crypto.randomUUID() };
    console.log("Datos enviados al guardarCliente:", clienteConId);
    guardarCliente(clienteConId);
    setFormData({ nombre: "", identificacion: "", telefono: "", email: "", direccion: "" });
    localStorage.removeItem("clienteForm"); // Limpiar storage después de guardar
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2>Formulario de Cliente</h2>
      {["nombre", "identificacion", "telefono", "email", "direccion"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          onChange={handleChange}
          required
          value={formData[field]}
        />
      ))}
      <button type="submit">Guardar Cliente</button>
    </form>
  );
};

export default ClienteForm;
