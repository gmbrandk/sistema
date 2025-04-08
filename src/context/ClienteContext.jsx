import { createContext, useState, useContext } from "react";

// Crear contexto
const ClienteContext = createContext();

// Custom Hook para acceder al contexto
export const useCliente = () => useContext(ClienteContext);

// Proveedor del contexto
export const ClienteProvider = ({ children }) => {
  // Estado para almacenar los clientes y equipos en memoria
  const [clienteId, setClienteId] = useState(null);
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [equipos, setEquipos] = useState([]);   // Lista de equipos asociados a los clientes

  // Función para guardar un cliente
  const guardarCliente = (cliente) => {
    const fakeId = crypto.randomUUID(); // Genera un ID único
    const clienteConId = { ...cliente, _id: fakeId }; // Lo añade al cliente
    setClientes((prevClientes) => [...prevClientes, clienteConId]); // Guarda el cliente en memoria
    setClienteId(fakeId); // Actualiza el clienteId
  };

  // Función para guardar un equipo asociado a un cliente
  const guardarEquipo = (equipo, clienteId) => {
    setEquipos((prevEquipos) => [
      ...prevEquipos,
      { ...equipo, clienteId },
    ]);
    console.log(`Guardando equipo para cliente con ID: ${clienteId}`, equipo);
  };

  return (
    <ClienteContext.Provider value={{ clienteId, clientes, equipos, setClienteId, guardarCliente, guardarEquipo }}>
      {children}
    </ClienteContext.Provider>
  );
};
