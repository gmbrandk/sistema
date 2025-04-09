import { useState } from "react";
import { useCliente } from "../context/ClienteContext";

const ClienteForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    identificacion: "",
    telefono: "",
    email: "",
    direccion: ""
  });

  const { guardarCliente } = useCliente();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteConId = { ...formData, _id: crypto.randomUUID() }; // Añadir ID único
    guardarCliente(clienteConId); // Guardar el cliente en memoria
    alert("Cliente registrado (simulado)");
    setFormData({ nombre: "", identificacion: "", telefono: "", email: "", direccion: "" }); // Limpiar formulario
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h2>Formulario de Cliente</h2>
      {["nombre", "identificacion", "telefono", "email", "direccion"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field}
          onChange={handleChange}
          required
          value={formData[field]}
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
      ))}
      <button type="submit">Guardar Cliente</button>
    </form>
  );
};

export default ClienteForm;
