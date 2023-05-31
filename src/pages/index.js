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
} from '../utils/constants.js'

import Card from '../components/Card.js'
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

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
  })
  return card.createCard()
}

const popupWithImage = new PopupWithImage('.popup_picture')
popupWithImage.setEventListeners()

const renderCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderCards.addItem(createNewCard(item))
    },
  },
  gallerySelector
)

const popupWithCardsInfo = new PopupWithForm(popupCardSelector, {
  handleFormSubmit: (values) => {
    renderCards.addItem(createNewCard(values))
    cardValidator.disableButtonSubmit()
  },
})
popupWithCardsInfo.setEventListeners()

btnAdd.addEventListener('click', () => {
  popupWithCardsInfo.open()
})

const userInfo = new UserInfo(userNameSelector, userJobSelector)

const popupWithUserInfo = new PopupWithForm(popupUserSelector, {
  handleFormSubmit: (values) => {
    userInfo.setUserInfo(values)
    userValidator.disableButtonSubmit()
  },
})
popupWithUserInfo.setEventListeners()

btnEdit.addEventListener('click', () => {
  popupWithUserInfo.open()
  inputName.value = userInfo.getUserInfo().name
  inputJob.value = userInfo.getUserInfo().job
})

renderCards.renderItems()
