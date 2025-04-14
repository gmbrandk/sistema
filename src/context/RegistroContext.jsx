import { createContext, useState, useContext, useEffect } from "react";
// import { useAnimation } from "./AnimationContext";

// Crear contexto
const RegistroContext = createContext();

// Custom Hook para acceder al contexto
export const useRegistro = () => useContext(RegistroContext);

export const RegistroProvider = ({ children }) => {
  const [clienteId, setClienteId] = useState(null);
  const [animationId, setAnimationId] = useState(null);
  const [clientes, setClientes] = useState(() => {
    const storedClientes = localStorage.getItem("clientes");
    return storedClientes ? JSON.parse(storedClientes) : [];
  });
  const [equipoId, setEquipoId] = useState(localStorage.getItem("equipoId") || null); // 👈 nuevo
  const [equipos, setEquipos] = useState(() => {
    const storedEquipos = localStorage.getItem("equipos");
    return storedEquipos ? JSON.parse(storedEquipos) : [];
  });

  const [ordenReciente, setOrdenReciente] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

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
    const clienteConId = {
      ...cliente,
      _id: fakeId,
      createdAt: new Date().toISOString(),
    };
    console.log("💾 [ClienteContext] guardando cliente:", clienteConId);
    setClientes((prev) => [...prev, clienteConId]);
    setClienteId(fakeId);
    localStorage.setItem("clienteId", fakeId);
  };

  const guardarEquipo = (equipo, clienteId) => {
    console.log("💾 [ClienteContext] guardando equipo para cliente:", clienteId, equipo);

    if (!clienteId) {
      console.error("❌ No hay clienteId disponible");
      return;
    }

    const generatedId = crypto.randomUUID();
    const equipoConId = {
      ...equipo,
      clienteId,
      _id: generatedId,
      createdAt: new Date().toISOString(),
    };

    setEquipos((prev) => [...prev, equipoConId]);
    setEquipoId(generatedId); // 👈 Guarda el equipoId actual
    localStorage.setItem("equipoId", equipoId); // 👈 Persiste

    console.log("✅ Equipo guardado:", equipoConId);
  };

  const guardarOrden = (orden) => {
    console.log("💾 Guardando orden:", orden);
    setOrdenes((prev) => [...prev, orden]);
    setOrdenReciente(orden); // ✅ Guardar la orden como la más reciente
    localStorage.setItem("ordenReciente", JSON.stringify(orden)); // Opcional: guardar la orden en localStorage
  };

  const resetFlujo = () => {
    console.log("Limpiando clienteId del localStorage:", localStorage.getItem("clienteId"));
    console.log("Limpiando equipoId del localStorage:", localStorage.getItem("equipoId"));

    // Limpia los valores de clienteId y equipoId en el estado (contexto)
    setClienteId(null);
    setEquipoId(null);  // Asegúrate de tener este estado también en tu contexto si lo gestionas allí

    // Elimina clienteId y equipoId del localStorage
    localStorage.removeItem("clienteId");
    localStorage.removeItem("equipoId");

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
    <RegistroContext.Provider value={{
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
      ordenReciente,
      guardarOrden,
    }}>
      {children}
    </RegistroContext.Provider>
  );
};
