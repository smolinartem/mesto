export default class Card {
  constructor(data, templateSelector, { handleCardClick, handleDelete, handleLike }) {
    this._name = data.name
    this._link = data.link
    this._id = data._id
    this._likes = data.likes
    this._ownerId = data.owner._id
    this._userId = data.myUserId

    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._handleDelete = handleDelete
    this._handleLike = handleLike
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.gallery__item')
      .cloneNode(true)

    return cardElement
  }

  _setEventListeners() {
    if (this._ownerId !== this._userId) {
      this._deleteElement.remove()
    } else {
      this._deleteElement.addEventListener('click', () => {
        this._handleDelete(this._id, this._card)
      })
    }

    this._likeElement.addEventListener('click', () => {
      if (this._likeElement.classList.contains('gallery__like_active')) {
        this._handleLike(true, this._id, this._counterElement)
        this._likeElement.classList.remove('gallery__like_active')
      } else {
        this._handleLike(false, this._id, this._counterElement)
        this._likeElement.classList.add('gallery__like_active')
      }
    })

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }

  createCard() {
    this._card = this._getElement()

    this._imageElement = this._card.querySelector('.gallery__image')
    this._nameElement = this._card.querySelector('.gallery__name')
    this._counterElement = this._card.querySelector('.gallery__counter')
    this._deleteElement = this._card.querySelector('.gallery__trash')
    this._likeElement = this._card.querySelector('.gallery__like')

    this._imageElement.src = this._link
    this._imageElement.alt = this._name
    this._nameElement.textContent = this._name
    this._counterElement.textContent = this._likes.length

    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        this._likeElement.classList.add('gallery__like_active')
      }
    })

    this._setEventListeners()

    return this._card
  }
}
