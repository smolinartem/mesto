function showInputError(config, input, error) {
  input.classList.add(config.inputErrorClass)
  error.textContent = input.validationMessage
  error.classList.add(config.errorClass)
}

function hideInputError(config, input, error) {
  input.classList.remove(config.inputErrorClass)
  error.classList.remove(config.errorClass)
  error.textContent = ''
}

function checkInputValidity(config, input) {
  const error = document.querySelector(`.${input.id}-error`)
  if (!input.checkValidity()) {
    showInputError(config, input, error)
  } else {
    hideInputError(config, input, error)
  }
}

function disableButtonSubmit(config, button) {
  button.setAttribute('disabled', '')
  button.classList.add(config.inactiveButtonClass)
}

function enableButtonSubmit(config, button) {
  button.removeAttribute('disabled')
  button.classList.remove(config.inactiveButtonClass)
}

function checkFormValidity(config, form) {
  const button = form.querySelector(config.submitButtonSelector)
  if (!form.checkValidity()) {
    disableButtonSubmit(config, button)
  } else {
    enableButtonSubmit(config, button)
  }
}

function setEventListeners(config, form) {
  const inputs = form.querySelectorAll(config.inputSelector)
  checkFormValidity(config, form)
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(config, input)
      checkFormValidity(config, form)
    })
  })
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector)
  forms.forEach((form) => {
    setEventListeners(config, form)
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
})
