export default class Card {
  constructor(data, templateSelector, { handleCardClick, handleDelete, handleLike }) {
    this._name = data.name
    this._link = data.link
    this._id = data._id
    this._likes = data.likes
    this._ownerId = data.owner._id
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
    this._card.querySelector('.gallery__trash').addEventListener('click', () => {
      this._handleDelete(this._id, this._card)
    })

    this._card.querySelector('.gallery__like').addEventListener('click', (event) => {
      /*       this._toggleLike(event) */
      this._handleLike(event, this._id, this._counter)
    })

    this._card.querySelector('.gallery__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }
  /* 
  _toggleLike(event) {
    event.target.classList.toggle('gallery__like_active')
  } */

  createCard() {
    this._card = this._getElement()

    this._image = this._card.querySelector('.gallery__image')
    this._image.src = this._link
    this._image.alt = this._name
    this._card.querySelector('.gallery__name').textContent = this._name

    this._counter = this._card.querySelector('.gallery__counter')
    this._counter.textContent = this._likes.length

    if (this._ownerId !== '036b8f2bd11e7f865fac3489') {
      this._card.querySelector('.gallery__trash').style.display = 'none'
    }

    this._setEventListeners()

    return this._card
  }
}
