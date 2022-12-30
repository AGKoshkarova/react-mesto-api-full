function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_size ${props.card ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_type_size">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <img
          className="popup__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <h2 className="popup__subtitle">{props.card ? props.card.name : ""}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
