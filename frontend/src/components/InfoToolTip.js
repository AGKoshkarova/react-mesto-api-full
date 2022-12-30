import React from "react";
import imageOk from "../images/ok.svg";
import imageError from "../images/no.svg";

export default function InfoToolTip(props) {
	return (
		<div
			className={`popup popup_type_info ${props.isOpen ? "popup_opened" : ""}`}
		>
			<div className="popup__container popup__container_type_info">
				<button
					className="popup__close-btn popup__close-btn_type_profile"
					type="button"
					aria-label="Закрыть"
					onClick={props.onClose}
				/>
				<img
					className="popup__info-image"
					src={`${props.isRegistered ? imageOk : imageError}`}
					alt=""
				/>
				<p className="popup__info-subtitle">{`${
					props.isRegistered
						? "Вы успешно зарегистрировались!"
						: "Что-то пошло не так! Попробуйте ещё раз."
				}`}</p>
			</div>
		</div>
	);
}
