import { useRegistro } from '../context/RegistroContext';
import styles from '../styles/registro.module.css';

const OrdenServicioRegistro = () => {
  const { ordenes } = useRegistro();

  if (ordenes.length === 0) {
    return <p>No hay órdenes registradas.</p>;
  }

  return (
    <div className={styles.registroWrapper}>
      <h2>Registro de Órdenes de Servicio</h2>
      {ordenes.map((orden) => (
        <div key={orden._id} className={styles.card}>
          <h3>Orden #{orden._id}</h3>
          <p><strong>Cliente ID:</strong> {orden.cliente_id}</p>
          <p><strong>Equipo ID:</strong> {orden.equipo_id}</p>
          <p><strong>Descripción:</strong> {orden.descripcion_problema}</p>
          <p><strong>Diagnóstico:</strong> {orden.diagnostico}</p>
          <p><strong>Reparación:</strong> {orden.reparacion_realizada}</p>
          <p><strong>Costo Total:</strong> ${orden.costo_total}</p>
          <p><strong>Fecha de Entrega:</strong> {orden.fecha_entrega}</p>
          <p><strong>Garantía:</strong> {orden.garantia_dias} días</p>
          <p><strong>Estado:</strong> {orden.estado}</p>
          <p><strong>Fecha de Creación:</strong> {new Date(orden.fecha_creacion).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default OrdenServicioRegistro;
