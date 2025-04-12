import { useState, useEffect } from "react";
import { useCliente } from "../context/ClienteContext";
import "../styles/forms.css";
import { useNavigate } from "react-router-dom";

const EquipoForm = ({ clienteId }) => {
  const [formData, setFormData] = useState({
    serial: "",
    tipo: "",
    estado: "",
    marca: "",
    modelo: ""
  });

  const { guardarEquipo, resetFlujo, resetAnimacion, finalizarRegistro } = useCliente();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("equipoForm");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {

    if(Object.values(formData).some(val => val !== "")) {
      localStorage.setItem("equipoForm", JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value }
    setFormData(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const equipo = { ...formData, _id: crypto.randomUUID() };
    guardarEquipo(equipo, clienteId);
    alert("Equipo registrado (simulado)");
    
    setFormData({ serial: "", tipo: "", estado: "", marca: "", modelo: "" });
    localStorage.removeItem("equipoForm");

    setTimeout(() => {
      finalizarRegistro();
      resetFlujo();
      resetAnimacion();
      navigate("/dashboard");
    }, 800); // Espera 800ms para que se complete la animación si tienes una
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2>Formulario de Equipo</h2>
      {["serial", "tipo", "estado", "marca", "modelo"].map((field) => (
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
      <button type="submit">Guardar Equipo</button>
    </form>
  );
};

export default EquipoForm;
