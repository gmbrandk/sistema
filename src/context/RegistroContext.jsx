import { createContext, useState, useContext, useEffect } from "react";

const RegistroContext = createContext();

export const useRegistro = () => useContext(RegistroContext);

export const RegistroProvider = ({ children }) => {
  const [clienteId, setClienteId] = useState(null);
  const [animationId, setAnimationId] = useState(null);

  const [clientes, setClientes] = useState(() => {
    const storedClientes = localStorage.getItem("clientes");
    return storedClientes ? JSON.parse(storedClientes) : [];
  });

  const [equipoId, setEquipoId] = useState(localStorage.getItem("equipoId") || null);

  const [equipos, setEquipos] = useState(() => {
    const storedEquipos = localStorage.getItem("equipos");
    return storedEquipos ? JSON.parse(storedEquipos) : [];
  });

  const [ordenReciente, setOrdenReciente] = useState(null);

  const [ordenes, setOrdenes] = useState(() => {
    const data = localStorage.getItem("ordenes");
    return data ? JSON.parse(data) : [];
  });

  // Restaurar clienteId
  useEffect(() => {
    const storedId = localStorage.getItem("clienteId");
    if (storedId) {
      setClienteId(storedId);
    }
  }, []);

  useEffect(() => {
    if (clienteId) {
      setAnimationId(clienteId);
    }
  }, [clienteId]);

  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem("equipos", JSON.stringify(equipos));
  }, [equipos]);

  useEffect(() => {
    localStorage.setItem("ordenes", JSON.stringify(ordenes));
  }, [ordenes]);

  const guardarCliente = (cliente) => {
    const fakeId = crypto.randomUUID();
    const clienteConId = {
      ...cliente,
      _id: fakeId,
      createdAt: new Date().toISOString(),
    };
    setClientes((prev) => [...prev, clienteConId]);
    setClienteId(fakeId);
    localStorage.setItem("clienteId", fakeId);
  };

  const guardarEquipo = (equipo, clienteId) => {
    if (!clienteId) return;
    const generatedId = crypto.randomUUID();
    const equipoConId = {
      ...equipo,
      clienteId,
      _id: generatedId,
      createdAt: new Date().toISOString(),
    };
    setEquipos((prev) => [...prev, equipoConId]);
    setEquipoId(generatedId);
    localStorage.setItem("equipoId", generatedId);
  };

  const guardarOrden = (orden) => {
    const nuevasOrdenes = [...ordenes, orden];
    setOrdenes(nuevasOrdenes);
    setOrdenReciente(orden);
    localStorage.setItem("ordenes", JSON.stringify(nuevasOrdenes));
  };

  const resetFlujo = () => {
    setClienteId(null);
    setEquipoId(null);
    localStorage.removeItem("clienteId");
    localStorage.removeItem("equipoId");
  };

  const resetAnimacion = () => {
    localStorage.removeItem("animationId");
    setAnimationId(null);
  };

  const finalizarRegistro = () => {
    localStorage.removeItem("clienteId");
    setClienteId(null);
  };

  return (
    <RegistroContext.Provider
      value={{
        clienteId,
        clientes,
        equipos,
        equipoId,
        animationId,
        setClienteId,
        guardarCliente,
        guardarEquipo,
        resetFlujo,
        resetAnimacion,
        finalizarRegistro,
        ordenes,
        setOrdenes,
        ordenReciente,
        guardarOrden,
      }}
    >
      {children}
    </RegistroContext.Provider>
  );
};
