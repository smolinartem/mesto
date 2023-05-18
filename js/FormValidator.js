export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._formElement = formElement
  }

  _showInputError(input, error) {
    input.classList.add(this._inputErrorClass)
    error.textContent = input.validationMessage
    error.classList.add(this._errorClass)
  }

  _hideInputError(input, error) {
    input.classList.remove(this._inputErrorClass)
    error.classList.remove(this._errorClass)
    error.textContent = ''
  }

  _checkInputValidity(input) {
    const error = document.querySelector(`.${input.id}-error`)
    if (!input.checkValidity()) {
      this._showInputError(input, error)
    } else {
      this._hideInputError(input, error)
    }
  }

  _disableButtonSubmit(button) {
    button.setAttribute('disabled', '')
    button.classList.add(this._inactiveButtonClass)
    button.classList.remove('hover')
  }

  _enableButtonSubmit(button) {
    button.removeAttribute('disabled')
    button.classList.remove(this._inactiveButtonClass)
    button.classList.add('hover')
  }

  _checkFormValidity() {
    const button = this._formElement.querySelector(this._submitButtonSelector)
    if (!this._formElement.checkValidity()) {
      this._disableButtonSubmit(button)
    } else {
      this._enableButtonSubmit(button)
    }
  }

  _setEventListeners() {
    const inputs = this._formElement.querySelectorAll(this._inputSelector)
    this._checkFormValidity()

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        this._checkFormValidity()
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }
}
