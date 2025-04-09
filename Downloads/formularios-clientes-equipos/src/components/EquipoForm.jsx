import { useState } from "react";
import { useCliente } from "../context/ClienteContext";

const EquipoForm = ({ clienteId }) => {
  const [formData, setFormData] = useState({
    serial: "",
    tipo: "",
    estado: "",
    marca: "",
    modelo: "",
  });

  const { guardarEquipo } = useCliente();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const equipo = { ...formData, _id: crypto.randomUUID() }; // Añadir ID único
    guardarEquipo(equipo, clienteId); // Guardar el equipo en memoria
    alert("Equipo registrado (simulado)");
    setFormData({ serial: "", tipo: "", estado: "", marca: "", modelo: "" }); // Limpiar formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulario de Equipo</h2>
      {["serial", "tipo", "estado", "marca", "modelo"].map((field) => (
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
      <button type="submit">Guardar Equipo</button>
    </form>
  );
};

export default EquipoForm;
