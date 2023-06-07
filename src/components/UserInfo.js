export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._name = document.querySelector(userNameSelector)
    this._job = document.querySelector(userJobSelector)
    this._avatar = document.querySelector(userAvatarSelector)
  }

  getUserInfo() {
    return { name: this._name.textContent, job: this._job.textContent }
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name
    this._job.textContent = job
  }
  setUserAvatar({ name, link }) {
    this._avatar.src = link
    this._avatar.alt = name
  }
}
