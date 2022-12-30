import PopupWithForm from "./PopupWithForm";
import React from "react";
//import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"avatar"}
      text={"Сохранить"}
      heading={"Обновить аватар"}
    >
      <>
        <input
          className="popup__input popup__input_type_avatar"
          id="avatar-input"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          defaultValue=""
          autoComplete="off"
          required=""
          ref={avatarRef}
        />
        <span className="popup__input-error avatar-input-error" />
      </>
    </PopupWithForm>
  );
}
