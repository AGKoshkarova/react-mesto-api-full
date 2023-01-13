import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";
import * as auth from "../utils/Auth";

function App() {
	//стейт для карточек
	const [cards, setCards] = React.useState([]);

	//функционал октрытия попапов
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);

	//стейт юзера
	const [currentUser, setCurrentUser] = React.useState({});

	//хранения состояния авторизации
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	//хранения состояния регистрации
	const [isRegistered, setIsRegistered] = React.useState(false);

	//хранение email авторизированного пользователя
	const [email, setEmail] = React.useState("");

	//хранение состояния открытия попапа успеха или ошибки регистрации
	const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

	//объект истории
	const history = useHistory();

	//функция снятия/установки лайка
	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some((i) => i._id === currentUser._id);

		// Отправляем запрос в API и получаем обновлённые данные карточки
		api
			.changeLikeCardStatus(card.card._id, !isLiked)
			.then((newCard) => {
				setCards((state) =>
					state.map((c) => (c._id === card.card._id ? newCard : c))
				);
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	}

	//функция удаления карточки
	function handleCardDelete(card) {
		api
			.deleteCard(card.card._id)
			.then(() => {
				setCards((cards) =>
					cards.filter((selectedCard) => selectedCard._id !== card.card._id)
				);
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
	}

	//функция закрытия попапов
	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setSelectedCard(false);
		setIsInfoToolTipOpen(false);
	}

	function handleUpdateUser(data) {
		api
			.changeUserInfo(data)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	}

	function handleUpdateAvatar(data) {
		api
			.changeAvatar(data)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	}

	function handleAddPlaceSubmit(data) {
		api
			.postNewCard(data)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	}

	function handleLogin({ email, password }) {
		auth
			.login(email, password)
			.then((res) => {
				setIsLoggedIn(true);
				setEmail(email);
				history.push("/");
				console.log(res);
			})
			.catch((err) => {
				setIsInfoToolTipOpen(true);
				console.log(err);
			});
	}

	//функция регистрации
	function handleRegister({ email, password }) {
		auth
			.register(email, password)
			.then((res) => {
				setIsRegistered(true);
				setIsLoggedIn(false);
				history.push("/signin");
				console.log(res);
			})
			.catch((err) => {
				setIsInfoToolTipOpen(true);
				console.log(err);
			});
	}

	function handleSignOut(email) {
		auth.logout(email)
		.then((res) => {
			setIsLoggedIn(false);
			setEmail("");
			history.push("/signin");
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	//эффект, устанавливающий пользователя
	//React.useEffect(() => {
	//	if (isLoggedIn) {
	//		api
	//			.getUserInformation()
	//			.then((res) => {
	//				setCurrentUser(res);
	//			})
	//			.catch((error) => {
	//				console.log(`Ошибка: ${error}`);
	//			});
	//	}
	//}, [isLoggedIn]);

	React.useEffect(() => {
		api
			.getUserInformation()
			.then((res) => {
				setIsLoggedIn(true);
				setCurrentUser(res);
				setEmail(res.email);
				history.push("/");
			})
			.catch((err) => console.log(`Ошибка: ${err}`));
	}, [isLoggedIn, history]);

	//валидация токена

	React.useEffect(() => {
        findToken();
    }, [isLoggedIn]);

	const findToken = () => {
        auth.checkToken()
            .then((res) => {
            	if(res) {
                	setIsLoggedIn(true);
            	}
			})
			.catch((err) => console.log(`Ошибка: ${err}`))
	}

	//отрисовка всех карточек с сервера
	React.useEffect(() => {
		if (isLoggedIn) {
			api
				.getAllCards()
				.then((res) => {
					setCards(res);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		}
	}, [isLoggedIn]);

	//эффект, вызываемый при монтировании App,
	//который отправляет запрос checkToken если jwt есть в хранилище
	//React.useEffect(() => {
	//	const token = localStorage.getItem("jwt");
	//	if (token) {
	//		auth
	//			.checkToken(token)
	//			.then((res) => {
	//				setEmail(res.data.email);
	//				setIsLoggedIn(true);
	//				history.push("/");
	//			})
	//			.catch((err) => {
	//				localStorage.removeItem("jwt");
	//				console.log(err);
	//			});
	//	}
	//}, [history]);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header email={email} onSignOut={handleSignOut} />
				<Switch>
					<ProtectedRoute
						exact
						path="/"
						component={Main}
						onEditProfile={handleEditProfileClick}
						onAddPlace={handleAddPlaceClick}
						onEditAvatar={handleEditAvatarClick}
						onCardClick={setSelectedCard}
						onCardLike={handleCardLike}
						onCardDelete={handleCardDelete}
						cards={cards}
						loggedIn={isLoggedIn}
					/>
					<Route path="/signup">
						<Register onRegister={handleRegister} />
					</Route>
					<Route path="/signin">
						<Login onLogin={handleLogin} />
					</Route>
				</Switch>

				{isLoggedIn && <Footer />}

				<EditProfilePopup
					onUpdateUser={handleUpdateUser}
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
				/>

				<AddPlacePopup
					onAddPlace={handleAddPlaceSubmit}
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
				/>

				<PopupWithForm
					isOpen=""
					name={"delete"}
					text={"Да"}
					heading={"Вы уверены?"}
				/>

				<EditAvatarPopup
					onUpdateAvatar={handleUpdateAvatar}
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
				/>

				<InfoToolTip
					loggedIn={isLoggedIn}
					isRegistered={isRegistered}
					isOpen={isInfoToolTipOpen}
					onClose={closeAllPopups}
				/>

				<ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;

