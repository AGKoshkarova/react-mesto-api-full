import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${
    isOwn ? "element__trash-btn" : "element__trash-btn_disabled"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `${
    isLiked ? "element__like-btn_active" : "element__like-btn"
  }`;

  function handleCardClick() {
    props.onCardClick(props);
  }

  //обработчик лайка
  function handleLikeClick() {
    props.onCardLike(props);
  }

  //удаление карточки
  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={props.link}
        alt={props.name}
        onClick={handleCardClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="element__place-container">
        <h3 className="element__place">{props.name}</h3>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          />
          <p className="element__like-counter">{props.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
