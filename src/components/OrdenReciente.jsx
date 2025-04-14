import { useEffect, useState } from "react";
import { useRegistro } from "../context/RegistroContext";

const OrdenReciente = () => {
  const { ordenReciente } = useRegistro();
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    if (ordenReciente) {
      setOrden(ordenReciente);
      localStorage.setItem("ordenReciente", JSON.stringify(ordenReciente)); // Guardar la orden en localStorage
    } else {
      const stored = localStorage.getItem("ordenReciente");
      if (stored) setOrden(JSON.parse(stored));
    }
  }, [ordenReciente]);

  if (!orden) return <p>Cargando orden reciente...</p>;

  return (
    <div>
      <h2>Resumen de Orden de Servicio</h2>
      <p><strong>ID:</strong> {orden._id}</p>
      <p><strong>Cliente:</strong> {orden.cliente_id}</p>
      <p><strong>Equipo:</strong> {orden.equipo_id}</p>
      <p><strong>Descripción:</strong> {orden.descripcion_problema}</p>
      <p><strong>Diagnóstico:</strong> {orden.diagnostico}</p>
      <p><strong>Reparación:</strong> {orden.reparacion_realizada}</p>
      <p><strong>Costo Total:</strong> ${orden.costo_total}</p>
      <p><strong>Fecha Entrega:</strong> {orden.fecha_entrega}</p>
      <p><strong>Garantía (días):</strong> {orden.garantia_dias}</p>
    </div>
  );
};

export default OrdenReciente;
