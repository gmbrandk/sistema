import { createContext, useState, useContext, useEffect } from "react";
//import { useAnimation } from "./AnimationContext";

// Crear contexto
const ClienteContext = createContext();

// Custom Hook para acceder al contexto
export const useCliente = () => useContext(ClienteContext);

export const ClienteProvider = ({ children }) => {
  const [clienteId, setClienteId] = useState(null);
  const [animationId, setAnimationId] = useState(null);
  const [clientes, setClientes] = useState(() => {
    const storedClientes = localStorage.getItem("clientes");
    return storedClientes ? JSON.parse(storedClientes) : [];
  });

  const [equipos, setEquipos] = useState(() => {
    const storedEquipos = localStorage.getItem("equipos");
    return storedEquipos ? JSON.parse(storedEquipos) : [];
  });

  // Restaurar clienteId desde localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("clienteId");
    if (storedId) {
      console.log("Restaurando clienteId desde localStorage:", storedId);
      setClienteId(storedId);
    }
  }, []);

  useEffect(() => {
    if (clienteId) {
      console.log("ClienteId listo para asociar equipo:", clienteId);
    } else {
      console.warn("clienteId es null. Probablemente aún no se ha restaurado.");
    }
  }, [clienteId]);
  

  // Guardar clientes en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem("equipos", JSON.stringify(equipos));
  }, [equipos]);

  useEffect(() => {
    if (clienteId) {
      setAnimationId(clienteId); // Actualiza animación cuando se crea cliente
    }
  }, [clienteId]);

  const guardarCliente = (cliente) => {
    const fakeId = crypto.randomUUID();
    const clienteConId = { ...cliente, _id: fakeId };
    console.log("💾 [ClienteContext] guardando cliente:", clienteConId);
    setClientes((prev) => [...prev, clienteConId]);
    setClienteId(fakeId);
    localStorage.setItem("clienteId", fakeId); // 👈 Persistir
  };

  const guardarEquipo = (equipo, clienteId) => {
    console.log("💾 [ClienteContext] guardando equipo para cliente:", clienteId, equipo);
    
    if (!clienteId) {
      console.error('No hay clienteId disponible');
      return;
    }
    setEquipos((prev) => [
      ...prev,
      { ...equipo, clienteId, _id: crypto.randomUUID() },
    ]);
    console.log(`Guardando equipo para cliente con ID: ${clienteId}`, equipo);
  };

  const resetFlujo = () => {
    console.log("Limpiando clienteId del localStorage:", localStorage.getItem("clienteId"));
    localStorage.removeItem("clienteId");
    setClienteId(null);
  };

  const resetAnimacion = () => {
    console.log("Limpiando animationId del localStorage:", localStorage.getItem("animationId"));
    localStorage.removeItem("animationId");
    setAnimationId(null);
  };
  
  const finalizarRegistro = () => {
    console.log("🎉 Registro finalizado. Limpiando clienteId.");
    localStorage.removeItem("clienteId");
    setClienteId(null);
  };
  
  return (
    <ClienteContext.Provider value={{
      clienteId,
      clientes,
      equipos,
      animationId,
      setClienteId,
      guardarCliente,
      guardarEquipo,
      resetFlujo,
      resetAnimacion,
      finalizarRegistro
    }}>
      {children}
    </ClienteContext.Provider>
  );
};
