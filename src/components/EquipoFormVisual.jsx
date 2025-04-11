import styles from "../styles/EquipoFormVisual.module.css";

const EquipoFormVisual = () => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.formCard}>
        <h2>Formulario de Equipo</h2>
        <input type="text" name="tipo" placeholder="Tipo de equipo" required />
        <input type="text" name="marca" placeholder="Marca" required />
        <input type="text" name="modelo" placeholder="Modelo" required />
        <input type="text" name="serial" placeholder="Número de serie" required />
        <input type="text" name="descripcion" placeholder="Descripción" required />
        <button type="submit">Guardar Equipo</button>
      </form>
    </div>
  );
};

export default EquipoFormVisual;
