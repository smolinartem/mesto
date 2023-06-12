import './index.css'
import {
  initialCards,
  config,
  btnEdit,
  btnAdd,
  userForm,
  cardsForm,
  inputName,
  inputJob,
  gallerySelector,
  popupCardSelector,
  popupUserSelector,
  userNameSelector,
  userJobSelector,
  userAvatarSelector,
} from '../utils/constants.js'

import Card from '../components/Card.js'
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'

const api = new Api({ token: 'ba426b9f-ef34-4346-9cd7-a3db6e837a2d', url: 'https://nomoreparties.co/v1/cohort-68' })
const section = new Section(gallerySelector)

//validation
const userValidator = new FormValidator(config, userForm)
userValidator.enableValidation()

const cardValidator = new FormValidator(config, cardsForm)
cardValidator.enableValidation()

function createNewCard(item) {
  const card = new Card(item, '#gallery-template', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link)
    },
    handleDelete: (cardId, cardElement) => {
      popupWithConfirmation.open(cardId, cardElement)
    },
  })
  return card.createCard()
}

const popupWithImage = new PopupWithImage('.popup_picture')
popupWithImage.setEventListeners()

const popupWithConfirmation = new PopupWithConfirmation('.popup_confirmation', {
  handleConfirmation: (id) => {
    api
      .deleteCard(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(`Error: ${err}`))
  },
})
popupWithConfirmation.setEventListeners()

const popupWithCardsInfo = new PopupWithForm(popupCardSelector, {
  handleFormSubmit: (values) => {
    api
      .setNewCard(values)
      .then((card) => {
        section.renderElement(createNewCard(card))
      })
      .catch((err) => console.log(`Error: ${err}`))
    cardValidator.disableButtonSubmit()
  },
})
popupWithCardsInfo.setEventListeners()

btnAdd.addEventListener('click', () => {
  popupWithCardsInfo.open()
})

const userInfo = new UserInfo(userNameSelector, userJobSelector, userAvatarSelector)

const popupWithUserInfo = new PopupWithForm(popupUserSelector, {
  handleFormSubmit: (values) => {
    userInfo.setUserInfo(values)
    api.editUserInfo(values).catch((err) => console.log(`Error: ${err}`))
    userValidator.disableButtonSubmit()
  },
})
popupWithUserInfo.setEventListeners()

btnEdit.addEventListener('click', () => {
  popupWithUserInfo.open()
  inputName.value = userInfo.getUserInfo().name
  inputJob.value = userInfo.getUserInfo().job
})

api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({ name: result.name, job: result.about })
    userInfo.setUserAvatar({ name: result.name, link: result.avatar })
  })
  .catch((error) => {
    console.log(`Error: ${error}`)
  })

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((element) => {
      section.renderElement(createNewCard(element))
    })
  })
  .catch((error) => {
    console.log(`Error: ${error}`)
  })
