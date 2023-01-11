import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onEditAvatar, cards, onAddPlace, onCardClick, onCardDelete, onCardLike }) {
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            alt="Аватарка Жака-Ива Кусто"
            src={currentUser.avatar}
          />
          <button
            className="profile__avatar-btn"
            type="button"
            aria-label="Редактировать"
            onClick={onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-btn"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements">
        <ul className="elements__container">
          {cards.map((card) => {
            return (
              <li key={card._id}>
                <Card
                  name={card.name}
                  link={card.link}
                  likes={card.likes}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
