import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRegistro } from '../context/RegistroContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/formCard.module.css';

const OrdenServicioForm = () => {
  const [formData, setFormData] = useState({
    cliente_id: '',
    equipo_id: '',
    descripcion_problema: '',
    diagnostico: '',
    reparacion_realizada: '',
    costo_total: '',
    fecha_entrega: '',
    garantia_dias: 30,
  });

  const { clienteId, equipoId, guardarOrden, resetFlujo, resetAnimacion, agregarOrden } = useRegistro();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('clienteId y equipoId en useEffect:', clienteId, equipoId);
    if (clienteId && equipoId) {
      setFormData((prevData) => ({
        ...prevData,
        cliente_id: clienteId,
        equipo_id: equipoId,
      }));
    }
  }, [clienteId, equipoId]);

/*if (!clienteId || !equipoId) {
  // Si los datos no han sido restaurados, muestra un mensaje o un loading spinner.
  return <div>Cargando...</div>;
}
*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log('Cambio de campo:', name, value);  // Ver qué campo se está modificando
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.cliente_id || !formData.equipo_id) {
      alert('Debes seleccionar un cliente y un equipo.');
      return;
    }
  
    const nuevaOrden = {
      ...formData,
      _id: crypto.randomUUID(),
      estado: 'En proceso',
      fecha_creacion: new Date().toISOString(),
    };
  
    try {
      guardarOrden(nuevaOrden);
  
      alert('Orden de servicio registrada correctamente.');
  
      // Delay para mostrar el mensaje o permitir transiciones
      setTimeout(() => {
        resetFlujo();
        resetAnimacion();

        localStorage.setItem("ordenReciente", JSON.stringify(nuevaOrden));
        navigate('/registro');
        setFormData({
          
          cliente_id: '',
          equipo_id: '',
          descripcion_problema: '',
          diagnostico: '',
          reparacion_realizada: '',
          costo_total: '',
          fecha_entrega: '',
          garantia_dias: 30,
        });
      
        // 👇 Solo borra clienteId y equipoId, NO ordenReciente
        localStorage.removeItem("clienteId");
        localStorage.removeItem("equipoId");
          localStorage.removeItem("clienteForm"); // ✅ NUEVO
          localStorage.removeItem("equipoForm");  // ✅ NUEVO
          
      }, 1000);
       // Menor delay, más ágil y seguro
    } catch (error) {
      console.error('❌ Error al guardar la orden:', error);
      alert('Ocurrió un error al guardar la orden.');
    }
  };
  

  const fields = [
    { name: 'cliente_id', type: 'text', placeholder: 'Cliente', disabled: true },
    { name: 'equipo_id', type: 'text', placeholder: 'Equipo', disabled: true },
    { name: 'descripcion_problema', type: 'textarea', placeholder: 'Descripción del problema' },
    { name: 'diagnostico', type: 'textarea', placeholder: 'Diagnóstico' },
    { name: 'reparacion_realizada', type: 'textarea', placeholder: 'Reparación realizada' },
    { name: 'costo_total', type: 'number', placeholder: 'Costo Total' },
    { name: 'fecha_entrega', type: 'date', placeholder: 'Fecha de entrega' },
    { name: 'garantia_dias', type: 'number', placeholder: 'Garantía (días)' },
  ];

  return (
    <motion.div
      className={styles.formWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Formulario de Orden de Servicio</h2>

        {fields.map((field) => {
          const { name, type, placeholder, disabled } = field;
          return type === 'textarea' ? (
            <textarea
              key={name}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
            />
          ) : (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              disabled={disabled}
            />
          );
        })}

        <button type="submit">Guardar Orden</button>
      </form>
    </motion.div>
  );
};

export default OrdenServicioForm;
