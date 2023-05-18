import { initialCards } from './InitialCards.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

// кнопки
const btnEdit = document?.querySelector('.profile__edit')
const btnAdd = document.querySelector('.profile__add')
const btnClose = document?.querySelectorAll('.popup__close')

const userName = document?.querySelector('.profile__name')
const userJob = document?.querySelector('.profile__job')
// попап с информацией о пользователе
const popupUser = document?.querySelector('.popup_user')
const popupUserForm = popupUser?.querySelector('.popup__form')
const inputName = popupUser?.querySelector('.popup__input_type_name')
const inputJob = popupUser?.querySelector('.popup__input_type_job')

const gallery = document.querySelector('.gallery__list')
// попап с информацией о месте
const popupAddCards = document.querySelector('.popup_gallery')
const popupAddCardsForm = popupAddCards.querySelector('.popup__form')
const inputPlace = popupAddCards.querySelector('.popup__input_type_place')
const inputLink = popupAddCards.querySelector('.popup__input_type_link')
// попап с картинкой
const popupPicture = document.querySelector('.popup_picture')
const imageOnScreen = popupPicture.querySelector('.popup__img')
const imageCaption = popupPicture.querySelector('.popup__caption')

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}
//validation
const userValidator = new FormValidator(config, popupUserForm)
userValidator.enableValidation()

const cardValidation = new FormValidator(config, popupAddCardsForm)
cardValidation.enableValidation()

initialCards.forEach((item) => {
  const card = new Card(item, '#gallery-template')
  const cardElement = card.createCard()

  gallery.prepend(cardElement)
})

function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEsc)
}

// отрытие попапа user
btnEdit.addEventListener('click', () => {
  openPopup(popupUser)
  inputName.value = userName.textContent
  inputJob.value = userJob.textContent
})

// отправка формы user
function handleSubmitUserForm(event) {
  event.preventDefault()
  userName.textContent = inputName.value
  userJob.textContent = inputJob.value

  event.submitter.classList.add('popup__submit_disabled')
  event.submitter.classList.remove('hover')
  event.submitter.disabled = true

  closePopup(popupUser)
}
popupUserForm.addEventListener('submit', handleSubmitUserForm)

// отрытие попапа cards
btnAdd.addEventListener('click', () => {
  openPopup(popupAddCards)
})

// отправка формы cards
function handleSubmitCardForm(event) {
  event.preventDefault()

  const newCard = new Card({ name: inputPlace.value, link: inputLink.value }, '#gallery-template')
  const newCardElement = newCard.createCard()
  gallery.prepend(newCardElement)

  popupAddCardsForm.reset()
  event.submitter.classList.add('popup__submit_disabled')
  event.submitter.classList.remove('hover')
  event.submitter.disabled = true

  closePopup(popupAddCards)
}
popupAddCardsForm.addEventListener('submit', handleSubmitCardForm)

// закрытие попапов
btnClose.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const popupToClose = event.target.closest('.popup')
    closePopup(popupToClose)
  })
})

function closePopupByOverlay() {
  const popupList = document.querySelectorAll('.popup')

  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup')) {
        closePopup(popup)
      }
    })
  })
}
closePopupByOverlay()

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const popupToClose = document.querySelector('.popup_opened')
    closePopup(popupToClose)
  }
}

export { openPopup, popupPicture, imageOnScreen, imageCaption }
