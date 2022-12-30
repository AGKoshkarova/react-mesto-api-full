import React from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	function handleSubmit(evt) {
		evt.preventDefault();
		const userData = {
			email,
			password,
		};
		props.onRegister(userData);
	}

	function handleEmailChange(evt) {
		setEmail(evt.target.value);
	}

	function handlePasswordChange(evt) {
		setPassword(evt.target.value);
	}
	return (
		<div className="auth-form">
			<h2 className="auth-form__title">Регистрация</h2>
			<form className="auth-form__form" name="signin" onSubmit={handleSubmit}>
				<input
					className="auth-form__input"
					id="email-input"
					type="email"
					name="email"
					placeholder="Email"
					value={email || ""}
					autoComplete="off"
					required
					onChange={handleEmailChange}
				/>
				<span className="auth-form__input-error"></span>
				<input
					className="auth-form__input"
					id="password-input"
					type="password"
					name="password"
					placeholder="Пароль"
					value={password || ""}
					autoComplete="off"
					required
					onChange={handlePasswordChange}
				/>
				<span className="auth-form__input-error password-input-error"></span>
				<button
					className="auth-form__submit-btn popup__submit-btn_disabled"
					type="submit"
					disabled=""
				>
					Зарегистрироваться
				</button>
			</form>
			<div className="auth-form__link-container">
				<p className="auth-form__subtitle">
					Уже зарегистрированы?
					<Link className="auth-form__link" to="/signin">
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
}
