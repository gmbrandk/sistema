// AnimationContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { useCliente } from "./ClienteContext"; // Importa ClienteContext

const AnimationContext = createContext();

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }) => {
  const { clienteId } = useCliente(); // Obtener el clienteId desde ClienteContext
  const [animationId, setAnimationId] = useState(clienteId); // Usa el clienteId en AnimationContext

  useEffect(() => {
    setAnimationId(clienteId); // Actualiza animationId cuando clienteId cambie
  }, [clienteId]);

  return (
    <AnimationContext.Provider value={{ animationId, setAnimationId, clienteId }}>
      {children}
    </AnimationContext.Provider>
  );
};
