import headerLogo from "../images/mesto_logo.svg";
import { Route, Link } from "react-router-dom";

function Header(props) {
	function handleSignOut() {
		props.onSignOut();
	}

	return (
		<header className="header">
			<img className="header__logo" src={headerLogo} alt="Логотип" />
			<Route exact path="/">
				<div className="header__container">
					<p className="header__user">{props.email}</p>
					<button className="header__log-out" onClick={handleSignOut}>
						Выйти
					</button>
				</div>
			</Route>
			<Route path="/signup">
				<Link className="header__auth-link" to="signin">
					Войти
				</Link>
			</Route>
			<Route path="/signin">
				<Link className="header__auth-link" to="signup">
					Регистрация
				</Link>
			</Route>
		</header>
	);
}

export default Header;
