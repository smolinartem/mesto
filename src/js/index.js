import '../pages/index.css'
import { initialCards, config } from './constants.js'
import Card from './Card.js'
import Section from './Section.js'
import { FormValidator } from './FormValidator.js'
import Popup from './Popup.js'
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

const renderCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#gallery-template', {
        handleCardClick: (name, link) => {
          const popupWithImage = new PopupWithImage('.popup_picture')
          popupWithImage.open(name, link)
          popupWithImage.setEventListeners()
        },
      })
      const newCard = card.createCard()
      renderCards.addItem(newCard)
    },
  },
  gallerySelector
)

const popupCardSelector = '.popup_gallery'
const popupWithCardsInfo = new PopupWithForm(popupCardSelector, {
  handleFormSubmit: (values) => {
    console.log(values)
    const card = new Card(values, '#gallery-template', {
      handleCardClick: (name, link) => {
        const popupWithImage = new PopupWithImage('.popup_picture')
        popupWithImage.open(name, link)
        popupWithImage.setEventListeners()
      },
    })
    const newCard = card.createCard()
    renderCards.addItem(newCard)
  },
})
popupWithCardsInfo.setEventListeners()

btnAdd.addEventListener('click', () => {
  popupWithCardsInfo.open()
})

renderCards.renderItems()
