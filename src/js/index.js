import '../pages/index.css'
import { initialCards, config } from './constants.js'
import Card from './Card.js'
import Section from './Section.js'
import { FormValidator } from './FormValidator.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'

// кнопки
const btnEdit = document.querySelector('.profile__edit')
const btnAdd = document.querySelector('.profile__add')
const closeButtons = document.querySelectorAll('.popup__close')

const userName = document.querySelector('.profile__name')
const userJob = document.querySelector('.profile__job')
// попап с информацией о пользователе
const popupUser = document.querySelector('.popup_user')
const popupUserForm = popupUser.querySelector('.popup__form')
const inputName = popupUser.querySelector('.popup__input_type_name')
const inputJob = popupUser.querySelector('.popup__input_type_job')

const gallery = document.querySelector('.gallery__list')
// попап с информацией о месте
/* const popupAddCards = document.querySelector('.popup_gallery')
const popupAddCardsForm = popupAddCards.querySelector('.popup__form')
const inputPlace = popupAddCards.querySelector('.popup__input_type_place')
const inputLink = popupAddCards.querySelector('.popup__input_type_link') */
// попап с картинкой
const popupPicture = document.querySelector('.popup_picture')
const imageOnScreen = popupPicture.querySelector('.popup__img')
const imageCaption = popupPicture.querySelector('.popup__caption')

//validation
/* const userValidator = new FormValidator(config, popupUserForm)
userValidator.enableValidation()

const cardValidator = new FormValidator(config, popupAddCardsForm)
cardValidator.enableValidation() */

const gallerySelector = '.gallery__list'

const defaultCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#gallery-template', {
        handleCardClick: (name, link) => {
          const popupWithImage = new PopupWithImage('.popup_picture')
          popupWithImage.open(name, link)
        },
      })
      const newCard = card.createCard()
      defaultCards.addItem(newCard)
    },
  },
  gallerySelector
)

defaultCards.renderItems()

/* function createNewCard(name, link) {
  const card = new Card({ name: name, link: link }, '#gallery-template')
  return card.createCard()
} */

/* initialCards.forEach((item) => {
  const newCard = createNewCard(item.name, item.link)
  gallery.prepend(newCard)
}) */

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

  userValidator.disableButtonSubmit()

  closePopup(popupUser)
}
popupUserForm.addEventListener('submit', handleSubmitUserForm)

const popupCardSelector = '.popup_gallery'
const popupWithCardsInfo = new PopupWithForm(popupCardSelector, {
  handleFormSubmit: (values) => {
    console.log(values)
  },
})

btnAdd.addEventListener('click', () => {
  popupWithCardsInfo.open()
})
/* btnAdd.addEventListener('click', () => {
  openPopup(popupAddCards)
})
function handleSubmitCardForm(event) {
  event.preventDefault()

  const newCard = createNewCard(inputPlace.value, inputLink.value)
  gallery.prepend(newCard)

  popupAddCardsForm.reset()
  cardValidator.disableButtonSubmit()

  closePopup(popupAddCards)
}
popupAddCardsForm.addEventListener('submit', handleSubmitCardForm) */

// закрытие попапов
closeButtons.forEach((btn) => {
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
