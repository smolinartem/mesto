'ba426b9f-ef34-4346-9cd7-a3db6e837a2d'
'cohort-68'

const serverOptions = {
  token: 'ba426b9f-ef34-4346-9cd7-a3db6e837a2d',
  url: 'https://nomoreparties.co/v1/cohort-68',
}

export default class Api {
  constructor(options) {
    this._url = options.url
    this._token = options.token
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
  }
}
