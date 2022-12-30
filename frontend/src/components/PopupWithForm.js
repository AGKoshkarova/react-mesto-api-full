import React from "react";

function PopupWithForm(props) {
	return (
		<div
			className={`popup popup_type_${props.name} ${
				props.isOpen ? "popup_opened" : ""
			}`}
		>
			<div className="popup__container">
				<button
					className="popup__close-btn popup__close-btn_type_profile"
					type="button"
					aria-label="Закрыть"
					onClick={props.onClose}
				/>

				<form
					className={`popup__form popup__form_type_${props.name}`}
					name={props.name}
					onSubmit={props.onSubmit}
				>
					<h2 className="popup__title">{props.heading}</h2>

					{props.children}

					<button className="popup__submit-btn" type="submit" disabled="">
						{props.text}
					</button>
					<div className="popup__preloader popup__preloader_inactive">
						<p>Сохранение...</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;
