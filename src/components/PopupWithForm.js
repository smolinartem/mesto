import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector)
    this._popup = document.querySelector(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._popup.querySelectorAll('.popup__input')
    this._submitElement = this._form.querySelector('.popup__submit')
    this._handleFormSubmit = handleFormSubmit

    this._initialSubmitText = this._submitElement.textContent
  }

  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name]
    })
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitElement.textContent = 'Сохранение...'
    } else {
      this._submitElement.textContent = this._initialSubmitText
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}
