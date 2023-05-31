export default class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._name = data.name
    this._link = data.link
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
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
      this._removeCard()
    })

    this._card.querySelector('.gallery__like').addEventListener('click', (event) => {
      this._toggleLike(event)
    })

    this._card.querySelector('.gallery__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }

  _removeCard() {
    this._card.remove()
    this._card = null
  }

  _toggleLike(event) {
    event.target.classList.toggle('gallery__like_active')
  }

  createCard() {
    this._card = this._getElement()

    this._image = this._card.querySelector('.gallery__image')
    this._image.src = this._link
    this._image.alt = this._name
    this._card.querySelector('.gallery__name').textContent = this._name

    this._setEventListeners()

    return this._card
  }
}
