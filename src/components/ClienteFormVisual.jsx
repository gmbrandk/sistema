import styles from "../styles/ClienteFormVisual.module.css";

const ClienteFormVisual = () => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.formCard}>
        <h2>Formulario de Cliente</h2>
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="text" name="identificacion" placeholder="Identificación" required />
        <input type="text" name="telefono" placeholder="Teléfono" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="text" name="direccion" placeholder="Dirección" required />
        <button type="submit">Guardar Cliente</button>
      </form>
    </div>
  );
};

export default ClienteFormVisual;
