import './index.css'
import {
  config,
  serverConfig,
  btnEdit,
  btnAdd,
  btnAvatar,
  userForm,
  cardsForm,
  avatarForm,
  inputName,
  inputJob,
  gallerySelector,
  popupCardSelector,
  popupUserSelector,
  popupAvatarSelector,
  userNameSelector,
  userJobSelector,
  userAvatarSelector,
} from '../utils/constants.js'

import Card from '../components/Card.js'
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

const api = new Api(serverConfig)
const section = new Section(gallerySelector)
const userInfo = new UserInfo(userNameSelector, userJobSelector, userAvatarSelector)

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo({ name: user.name, job: user.about })
    userInfo.setUserAvatar({ name: user.name, link: user.avatar })

    cards.forEach((card) => {
      card.myUserId = user._id
      section.renderElement(createNewCard(card))
    })
  })
  .catch((err) => console.log(`Error: ${err}`))

//validation
const userValidator = new FormValidator(config, userForm)
userValidator.enableValidation()

const cardValidator = new FormValidator(config, cardsForm)
cardValidator.enableValidation()

const avatarValidator = new FormValidator(config, avatarForm)
avatarValidator.enableValidation()

function createNewCard(item) {
  const card = new Card(item, '#gallery-template', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link)
    },
    handleDelete: (cardId, cardElement) => {
      popupWithConfirmation.open(cardId, cardElement)
    },
    handleLike: (isLiked, cardId, counterElement) => {
      if (isLiked) {
        api
          .deleteLike(cardId)
          .then((res) => {
            counterElement.textContent = res.likes.length
          })
          .catch((err) => console.log(`Error: ${err}`))
      } else {
        api
          .putLike(cardId)
          .then((res) => {
            counterElement.textContent = res.likes.length
          })
          .catch((err) => console.log(`Error: ${err}`))
      }
    },
  })
  return card.createCard()
}

function handleAvatarFormSubmit(data) {
  popupWithAvatarInfo.renderLoading(true)
  api
    .setNewAvatar(data)
    .then((user) => {
      userInfo.setUserAvatar({ name: user.name, link: user.avatar })
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => {
      popupWithAvatarInfo.renderLoading(false)
    })
  avatarValidator.disableButtonSubmit()
}

function handleUserFormSubmit(data) {
  userInfo.setUserInfo(data)
  popupWithUserInfo.renderLoading(true)
  api
    .editUserInfo(data)
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => {
      popupWithUserInfo.renderLoading(false)
    })
  userValidator.disableButtonSubmit()
}

function handleCardsFromSubmit(data) {
  popupWithCardsInfo.renderLoading(true)
  api
    .setNewCard(data)
    .then((card) => {
      card.myUserId = card.owner._id
      section.renderElement(createNewCard(card))
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => {
      popupWithCardsInfo.renderLoading(false)
    })
  cardValidator.disableButtonSubmit()
}

const popupWithImage = new PopupWithImage('.popup_picture')
popupWithImage.setEventListeners()

const popupWithConfirmation = new PopupWithConfirmation('.popup_confirmation', {
  handleConfirmation: (id) => {
    api.deleteCard(id).catch((err) => console.log(`Error: ${err}`))
  },
})
popupWithConfirmation.setEventListeners()

const popupWithCardsInfo = new PopupWithForm(popupCardSelector, {
  handleFormSubmit: handleCardsFromSubmit,
})
popupWithCardsInfo.setEventListeners()

btnAdd.addEventListener('click', () => {
  popupWithCardsInfo.open()
})

const popupWithUserInfo = new PopupWithForm(popupUserSelector, {
  handleFormSubmit: handleUserFormSubmit,
})
popupWithUserInfo.setEventListeners()

btnEdit.addEventListener('click', () => {
  popupWithUserInfo.open()
  inputName.value = userInfo.getUserInfo().name
  inputJob.value = userInfo.getUserInfo().job
})

const popupWithAvatarInfo = new PopupWithForm(popupAvatarSelector, {
  handleFormSubmit: handleAvatarFormSubmit,
})
popupWithAvatarInfo.setEventListeners()

btnAvatar.addEventListener('click', () => {
  popupWithAvatarInfo.open()
})
