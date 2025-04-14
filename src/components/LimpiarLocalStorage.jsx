const LimpiarLocalStorage = () => {
    const limpiarStorageDelSistema = () => {
      const claves = [
        "clientes",
        "equipos",
        "ordenes",
        "clienteId",
        "equipoId",
        "animationId",
        "ordenReciente",
        "clienteForm",
        "equipoForm"
      ];
  
      claves.forEach((clave) => localStorage.removeItem(clave));
      console.log("🧹 LocalStorage limpiado correctamente.");
      alert("LocalStorage del sistema limpiado 🧼");
    };
  
    return (
      <button onClick={limpiarStorageDelSistema} style={{ margin: "1rem", padding: "0.5rem 1rem", backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "8px" }}>
        Limpiar LocalStorage
      </button>
    );
  };
  
  export default LimpiarLocalStorage;
  