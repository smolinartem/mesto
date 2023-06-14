import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleConfirmation }) {
    super(popupSelector)
    this._popup = document.querySelector(popupSelector)
    this._button = this._popup.querySelector('.popup__submit')
    this._handleConfirmation = handleConfirmation
  }

  setEventListeners() {
    super.setEventListeners()
    this._button.addEventListener('click', () => {
      this._handleConfirmation(this._id, this._card)
    })
  }

  open(id, card) {
    super.open()
    this._id = id
    this._card = card
  }
}
