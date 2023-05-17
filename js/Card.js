const gallery = document.querySelector('.gallery__list')

const popupPicture = document.querySelector('.popup_picture')
const imageOnScreen = popupPicture.querySelector('.popup__img')
const imageCaption = popupPicture.querySelector('.popup__caption')

class Card {
  constructor(data, templateSelector) {
    this._name = data.name
    this._link = data.link
    this._templateSelector = templateSelector
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
      this._showPreview()
    })
  }

  _removeCard() {
    this._card.remove()
  }

  _toggleLike(event) {
    event.target.classList.toggle('gallery__like_active')
  }

  _showPreview() {
    openPopup(popupPicture)

    imageOnScreen.src = this._link
    imageOnScreen.alt = this._name
    imageCaption.textContent = this._name
  }

  createCard() {
    this._card = this._getElement()
    this._setEventListeners()

    this._card.querySelector('.gallery__image').src = this._link
    this._card.querySelector('.gallery__image').alt = this._name
    this._card.querySelector('.gallery__name').textContent = this._name

    return this._card
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '#gallery-template')
  const cardElement = card.createCard()

  gallery.prepend(cardElement)
})

function openPopup(popup) {
  popup.classList.add('popup_opened')
}
