import Card from "../components/Card.js"
import { fullSizeImage, popupWithConfirm, api, userID } from "../pages/index.js";

export function createCard (item) {
    const card = new Card({
        card: item,
        handleCardClick: () => {
            fullSizeImage.open(item.name, item.link)
        },
        userID,
        handleDeleteCardIcon: () => {
            popupWithConfirm.open();
            popupWithConfirm.submitHandler(() => {
                api.deleteCard(item._id)
                .then(() => {
                card.handleDeleteCard();
                popupWithConfirm.close();
                })
                .catch((error) => {
                    console.log(`Ошибка: ${error}`);
                })
            })
        },
        handleLikeClick: () => {
            if(card.isLiked()) {
                api.deleteLike(item._id)
                .then((res) => {
                    card.setLikes(res.likes);
                })
                .catch((error) => {
                    console.log(`Ошибка: ${error}`);
                })
            } else {
                api.putLike(item._id)
                .then((res) => {
                    card.setLikes(res.likes);
                })
                .catch((error) => {
                    console.log(`Ошибка: ${error}`);
                })
            }  
        }
    }, '#element-card');

    const cardElement = card.generateCard();
    return cardElement;
}