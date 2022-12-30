//import { data } from "autoprefixer";

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse() {
        return (res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Код ошибки: ${res.status}.`)
        }
    }

    getUserInformation() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse())
    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse())
    }

    changeUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse())
    }

    postNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse())
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse())
    }
    
    putLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse())
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE', 
            headers: this._headers
        })
        .then(this._checkResponse())
    }
    
    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse())
        }
    
    changeLikeCardStatus(id, action) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: `${!action ? 'DELETE' : 'PUT'}`,
            headers: this._headers,
            //body: JSON.stringify()
        })
        .then(this._checkResponse())
        }
    }

export const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-50/",
    headers: {
        'content-type': 'application/json',
        authorization: 'e53308b2-3f61-4379-8ee7-a33c421f8fa6'
    }
})