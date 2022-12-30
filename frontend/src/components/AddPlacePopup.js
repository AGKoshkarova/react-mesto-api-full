import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup(props) {
  const [place, setPlace] = React.useState();
  const [link, setLink] = React.useState();

  function handlePlaceChange(evt) {
    setPlace(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: place,
      link: link,
    });
  }

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"card"}
      heading={"Новое место"}
      text={"Создать"}
    >
      <>
        <input
          className="popup__input popup__input_type_place-name"
          id="place-input"
          type="text"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          autoComplete="off"
          required=""
          onChange={handlePlaceChange}
          value={place || ""}
        />
        <span className="popup__input-error place-input-error" />
        <input
          className="popup__input popup__input_type_link"
          id="link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required=""
          onChange={handleLinkChange}
          value={link || ""}
        />
        <span className="popup__input-error link-input-error" />
      </>
    </PopupWithForm>
  );
}
