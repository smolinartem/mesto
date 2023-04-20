/* enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}) */

function showInputError(element) {
  element.classList.add('form__input_type_error')

  const error = document?.querySelector(`.${element.id}-error`)
  error.textContent = element.validationMessage
  error.classList.add('popup__input-error_active')
}

function hideInputError(element) {
  element.classList.remove('form__input_type_error')

  const error = document?.querySelector(`.${element.id}-error`)
  error.classList.remove('popup__input-error_active')
  error.textContent = ''
}

function isValid(input) {
  if (!input.validity.valid) {
    showInputError(input)
  } else {
    hideInputError(input)
  }
}

function setEventListeners() {
  const inputList = document.querySelectorAll('.popup__input')

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(input)

      console.log(popupUserForm.checkValidity())
      console.log(popupAddCardsForm.checkValidity())
    })
  })
}

setEventListeners()
