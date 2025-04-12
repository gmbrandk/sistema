import { useState, useEffect } from "react";
import { useCliente } from "../context/ClienteContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/formCard.module.css";

const EquipoFormVisual = () => {
    const [formData, setFormData] = useState({
      tipo:"",
      marca:"",
      modelo:"",
      serial:""
    });
  
    const { clienteId, guardarEquipo, resetFlujo, resetAnimacion } = useCliente();
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

      if (!clienteId) {
        alert("Debe registrar un cliente primero.");
        return;
      }

      const equipo = { ...formData, _id: crypto.randomUUID() };
      guardarEquipo(equipo, clienteId);
      alert("Equipo registrado (simulado)");
      
      setFormData({ serial: "", tipo: "", estado: "", marca: "", modelo: "" });
      localStorage.removeItem("equipoForm");
  
      setTimeout(() => {
        resetFlujo();
        resetAnimacion();
        navigate("/dashboard");
      }, 800); // Espera 800ms para que se complete la animación si tienes una
    };
    
  return (
    <div className={styles.formWrapper} >
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Formulario de Equipo</h2>
        {["tipo", "marca", "modelo","serial"].map((field) => (
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
        <button>Guardar Equipo</button>
      </form>
    </div>
  );
};

export default EquipoFormVisual;
