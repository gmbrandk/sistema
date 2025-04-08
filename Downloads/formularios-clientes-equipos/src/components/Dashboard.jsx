import { useCliente } from "../context/ClienteContext";

const Dashboard = () => {
  const { clientes, equipos } = useCliente();

  return (
    <div>
      <h2>Dashboard</h2>
      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table border="1" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Identificación</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Equipos</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => {
              // Filtrar los equipos asociados a este cliente
              const equiposCliente = equipos.filter((equipo) => equipo.clienteId === cliente._id);
              return (
                <tr key={cliente._id}>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.identificacion}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.direccion}</td>
                  <td>
                    {equiposCliente.length > 0 ? (
                      equiposCliente.map((equipo) => (
                        <div key={equipo._id}>
                          <p>{equipo.nombre} ({equipo.marca} - {equipo.modelo})</p>
                        </div>
                      ))
                    ) : (
                      <p>No hay equipos</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
