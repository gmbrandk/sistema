import "../styles/modal.css"; // Asegúrate de crear este archivo CSS

const Modal = ({ showModal, closeModal, children }) => {
    console.log("Estado de showModal en Modal: ", showModal);  // Verifica el valor aquí
    if (!showModal) return null;

    return (
        <div  className={`modal ${showModal ? "active" : ""}`}>
          <div className="modal-content">
            <h3>Formulario enviado con éxito!</h3>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      );
};

export default Modal;