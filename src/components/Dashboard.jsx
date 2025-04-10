import { useCliente } from "../context/ClienteContext";
import { useState } from "react";
import "../styles/dashboard.css"; // Asegúrate de importar los estilos
import { FaCogs } from "react-icons/fa";

const Dashboard = () => {
  const { clientes, equipos } = useCliente();
  const [devMode, setDevMode] = useState(false); // Estado para activar/desactivar el modo desarrollador
  
  const toggleDevMode = () => {
    setDevMode(!devMode);
  }

  // Ordenar clientes por fecha de creación (los más recientes primero)
  const sortedClientes = clientes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard de Clientes</h2>
      
      {/* Botón para activar/desactivar modo desarrollador */}
      <button onClick={toggleDevMode} className="dev-mode-button">
        <FaCogs style={{ marginRight : "8px" }} />
        {devMode ? "Desactivar Modo Desarrollador" : "Activar Modo Desarrollador"}
      </button>
      
      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <div className="dashboard-cards">
          {sortedClientes.map((cliente) => {
            // Filtrar los equipos asociados a este cliente
            const equiposCliente = equipos.filter((equipo) => equipo.clienteId === cliente._id);
            return (
              <div key={cliente._id} className="dashboard-card">
                <h3>{cliente.nombre}</h3>
                <p><strong>Identificación:</strong> {cliente.identificacion}</p>
                <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                <p><strong>Email:</strong> {cliente.email}</p>
                <p><strong>Dirección:</strong> {cliente.direccion}</p>
                <p><strong>Fecha Ingreso:</strong>{new Date(cliente.createdAt).toLocaleString()}</p>
                <div>
                  <strong>Equipos:</strong>
                  {equiposCliente.length > 0 ? (
                    equiposCliente.map((equipo) => (
                      <div key={equipo._id}>
                        <p>{equipo.nombre} ({equipo.marca} - {equipo.modelo})</p>
                      </div>
                    ))
                  ) : (
                    <p>No hay equipos</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modo desarrollador */}
      {devMode && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Datos de Clientes (JSON)</h3>
          <pre>{JSON.stringify(clientes, null, 2)}</pre>
          
          <h3>Datos de Equipos (JSON)</h3>
          <pre>{JSON.stringify(equipos, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
