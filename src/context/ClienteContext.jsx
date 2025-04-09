import { createContext, useState, useContext, useEffect } from "react";
import { useAnimation } from "./AnimationContext";

// Crear contexto
const ClienteContext = createContext();

// Custom Hook para acceder al contexto
export const useCliente = () => useContext(ClienteContext);

export const ClienteProvider = ({ children }) => {
  const [clienteId, setClienteId] = useState(null);
  const [clientes, setClientes] = useState(() => {
    const storedClientes = localStorage.getItem("clientes");
    return storedClientes ? JSON.parse(storedClientes) : [];
  });

  const [equipos, setEquipos] = useState(() => {
    const storedEquipos = localStorage.getItem("equipos");
    return storedEquipos ? JSON.parse(storedEquipos) : [];
  });

  // Guardar clientes en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem("equipos", JSON.stringify(equipos));
  }, [equipos]);

  const guardarCliente = (cliente) => {
    const fakeId = crypto.randomUUID();
    const clienteConId = { ...cliente, _id: fakeId };
    setClientes((prev) => [...prev, clienteConId]);
    setClienteId(fakeId);
  };

  const guardarEquipo = (equipo, clienteId) => {
    setEquipos((prev) => [
      ...prev,
      { ...equipo, clienteId, _id: crypto.randomUUID() },
    ]);
    console.log(`Guardando equipo para cliente con ID: ${clienteId}`, equipo);
  };

  return (
    <ClienteContext.Provider value={{
      clienteId,
      clientes,
      equipos,
      setClienteId,
      guardarCliente,
      guardarEquipo
    }}>
      {children}
    </ClienteContext.Provider>
  );
};
