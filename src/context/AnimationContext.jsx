// AnimationContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { useRegistro } from "./RegistroContext";

const AnimationContext = createContext();

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }) => {
  const { clienteId } = useRegistro(); // Obtener el clienteId desde ClienteContext
  const [animationId, setAnimationId] = useState(clienteId); // Usa el clienteId en AnimationContext

  useEffect(() => {
    setAnimationId(clienteId); // Actualiza animationId cuando clienteId cambie
  }, [clienteId]);

  useEffect(() => {
    const storedClienteId = localStorage.getItem("clienteId");
    if (storedClienteId) {
      setAnimationId(storedClienteId); // ✅ Mantener estado
    }
  }, []);

  return (
    <AnimationContext.Provider value={{ animationId, setAnimationId, clienteId }}>
      {children}
    </AnimationContext.Provider>
  );
};
