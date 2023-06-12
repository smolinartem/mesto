'ba426b9f-ef34-4346-9cd7-a3db6e837a2d'
'cohort-68'
'owner id   036b8f2bd11e7f865fac3489'

const serverOptions = {
  token: 'ba426b9f-ef34-4346-9cd7-a3db6e837a2d',
  url: 'https://nomoreparties.co/v1/cohort-68',
}

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

  getUserInfo() {
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
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse)
  }
}
