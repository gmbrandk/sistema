import { useNavigate } from 'react-router-dom';
import { useRegistro } from '../context/RegistroContext';
import styles from '../styles/registro.module.css';
import { useEffect } from 'react';

const OrdenServicioRegistro = () => {
  const { ordenes, ordenReciente, setOrdenReciente } = useRegistro();
  const navigate = useNavigate();

  // 🔍 Log del montaje inicial
  console.log("📥 Renderizando OrdenServicioRegistro");
  console.log("🔄 ordenes:", ordenes);
  console.log("🆕 ordenReciente:", ordenReciente);

  useEffect(() => {
    console.log("🧩 useEffect ejecutado: ordenes cambió");
    console.log("🔄 ordenes dentro de useEffect:", ordenes);
  }, [ordenes]);

  useEffect(() => {
    console.log("🧩 useEffect ejecutado: ordenReciente cambió");
    console.log("🆕 ordenReciente:", ordenReciente);
  }, [ordenReciente]);

  useEffect(() => {
    const orden = JSON.parse(localStorage.getItem("ordenReciente"));
    if (orden) {
      setOrdenReciente(orden);
    }
  }, []);

  if (!ordenes || !Array.isArray(ordenes) || ordenes.length === 0) {
    console.warn("⚠️ No hay órdenes registradas o el array está vacío.");
    return <p>No hay órdenes registradas.</p>;
  }

  const todasLasOrdenes = ordenReciente
    ? [ordenReciente, ...ordenes.filter(o => o._id !== ordenReciente._id)]
    : ordenes;

  const ordenesOrdenadas = [...todasLasOrdenes].sort(
    (a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
  );

  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem("ordenReciente");
          navigate("/testing");
        }}
      >
        Finalizar
      </button>
      <div className={styles.registroWrapper}>
        <h2>Registro de Órdenes de Servicio</h2>
        {ordenesOrdenadas.map((orden) => (
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
    </div>
  );
};

export default OrdenServicioRegistro;
