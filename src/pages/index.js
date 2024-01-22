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

    cards.reverse().forEach((card) => {
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
    handleLike: (isLiked, cardId) => {
      if (isLiked) {
        api
          .deleteLike(cardId)
          .then((res) => {
            card.toggleLike(true)
            card.countLikes(res.likes.length)
          })
          .catch((err) => console.log(`Error: ${err}`))
      } else {
        api
          .putLike(cardId)
          .then((res) => {
            card.toggleLike(false)
            card.countLikes(res.likes.length)
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
      popupWithAvatarInfo.close()
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => {
      popupWithAvatarInfo.renderLoading(false)
    })
}

function handleUserFormSubmit(data) {
  popupWithUserInfo.renderLoading(true)
  api
    .editUserInfo(data)
    .then((user) => {
      console.log(user)
      userInfo.setUserInfo({ name: user.name, job: user.about })
      popupWithUserInfo.close()
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => {
      popupWithUserInfo.renderLoading(false)
    })
}

function handleCardsFormSubmit(data) {
  popupWithCardsInfo.renderLoading(true)
  api
    .setNewCard(data)
    .then((card) => {
      card.myUserId = card.owner._id
      section.renderElement(createNewCard(card))
      popupWithCardsInfo.close()
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => {
      popupWithCardsInfo.renderLoading(false)
    })
}

function handleConfirmationFormSubmit(id, cardElement) {
  api
    .deleteCard(id)
    .then(() => {
      cardElement.remove()
      popupWithConfirmation.close()
    })
    .catch((err) => console.log(`Error: ${err}`))
}

const popupWithImage = new PopupWithImage('.popup_picture')
popupWithImage.setEventListeners()

const popupWithConfirmation = new PopupWithConfirmation('.popup_confirmation', {
  handleConfirmation: handleConfirmationFormSubmit,
})
popupWithConfirmation.setEventListeners()

const popupWithCardsInfo = new PopupWithForm(popupCardSelector, {
  handleFormSubmit: handleCardsFormSubmit,
})
popupWithCardsInfo.setEventListeners()

const popupWithUserInfo = new PopupWithForm(popupUserSelector, {
  handleFormSubmit: handleUserFormSubmit,
})
popupWithUserInfo.setEventListeners()

const popupWithAvatarInfo = new PopupWithForm(popupAvatarSelector, {
  handleFormSubmit: handleAvatarFormSubmit,
})
popupWithAvatarInfo.setEventListeners()

btnAvatar.addEventListener('click', () => {
  avatarValidator.resetValidation()
  popupWithAvatarInfo.open()
})

btnAdd.addEventListener('click', () => {
  cardValidator.resetValidation()
  popupWithCardsInfo.open()
})

btnEdit.addEventListener('click', () => {
  userValidator.resetValidation()
  popupWithUserInfo.open()
  popupWithUserInfo.setInputValues(userInfo.getUserInfo())
})
