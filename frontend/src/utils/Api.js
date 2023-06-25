class Api {
    constructor({ baseUrl, headers, auth, currentToken }) {
        this._addres = baseUrl;
        this._headers = headers;
        this._auth = auth;
    }

    _setToken(currentToken){
        this._headers.Authorization = `Bearer ${currentToken}`;
    }

    _getAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }

    getUserData() {
        const user = fetch(`${this._addres}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        return user.then(this._getAnswer)
    }

    getInitialCards() {
        const cards = fetch(`${this._addres}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        return cards.then(this._getAnswer)
    }

    patchProfile(profileData) {
        return fetch(`${this._addres}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name: profileData.name, about: profileData.about }),
        }).then(this._getAnswer)
    }

    postNewCard(newCardData) {
        return fetch(`${this._addres}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: newCardData.name,
                link: newCardData.link
            })
        }).then(this._getAnswer)
    }

    deleteMyCard(card) {
        return fetch(`${this._addres}/cards/${card._id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._getAnswer)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._addres}/cards/${id}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        }).then(this._getAnswer);
    }

    patchAvatarUser(avatar) {
        return fetch(`${this._addres}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar),
        }).then(this._getAnswer)
    }

    postNewUser(userData) {
        return fetch(`${this._auth}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: userData.password,
                email: userData.email
            })
        }).then((res) => {
            console.log(res.body, res.status);
            return this._getAnswer
        })
    }

    postUserAutorization(userData) {
        return fetch(`${this._auth}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: userData.password,
                email: userData.email
            })
        }).then(this._getAnswer)
    }

    getUserAuthData(userToken) {
        return fetch(`${this._auth}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json"
            }
        }).then(this._getAnswer)
    }
}

const api = new Api({
    // baseUrl: 'http://api.sss.student.nomoreparties.sbs',
    baseUrl: 'http://localhost:3000',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
    auth: 'http://api.sss.student.nomoreparties.sbs'
});
export default api