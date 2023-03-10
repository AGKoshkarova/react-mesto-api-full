export const BASE_URL = "https://api.mesto.koshkarova.nomoredomains.club";

function getResponse(res) {
	if (!res.ok) {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	return res.json();
}

export const register = (email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	})
		.then((res) => getResponse(res))
		.then((res) => {
			console.log(res);
			return res;
		});
};

export const login = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	})
		.then((res) => getResponse(res))
		.then((data) => data);
};

export const checkToken = () => {
	return fetch(`${BASE_URL}/users/me`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => getResponse(res))
		.then((data) => data);
};