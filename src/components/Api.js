export default class Api {
  constructor(options) {
    this._url = options.url
    this._token = options.token
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse)
  }

  editUserInfo(values) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        about: values.job,
      }),
    }).then(this._handleResponse)
  }

  setNewCard(values) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        link: values.link,
      }),
    }).then(this._handleResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse)
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse)
  }

  setNewAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleResponse)
  }
}
