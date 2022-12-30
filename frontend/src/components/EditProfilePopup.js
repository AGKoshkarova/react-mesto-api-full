import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  //сабмит формы
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"profile"}
      heading={"Редактировать профиль"}
      text={"Сохранить"}
    >
      <>
        <input
          className="popup__input popup__input_type_name"
          id="name-input"
          type="text"
          name="name"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          autoComplete="off"
          required=""
          onChange={handleNameChange}
          value={name || ""}
        />
        <span className="popup__input-error name-input-error" />
        <input
          className="popup__input popup__input_type_description"
          id="description-input"
          type="text"
          name="about"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          autoComplete="off"
          required=""
          onChange={handleDescriptionChange}
          value={description || ""}
        />
        <span className="popup__input-error description-input-error" />
      </>
    </PopupWithForm>
  );
}
