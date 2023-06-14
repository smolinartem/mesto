import './index.css'
import {
  config,
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

const api = new Api({ token: 'ba426b9f-ef34-4346-9cd7-a3db6e837a2d', url: 'https://nomoreparties.co/v1/cohort-68' })
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

const popupWithImage = new PopupWithImage('.popup_picture')
popupWithImage.setEventListeners()

const popupWithConfirmation = new PopupWithConfirmation('.popup_confirmation', {
  handleConfirmation: (id) => {
    api.deleteCard(id).catch((err) => console.log(`Error: ${err}`))
  },
})
popupWithConfirmation.setEventListeners()

const popupWithCardsInfo = new PopupWithForm(popupCardSelector, {
  handleFormSubmit: (values) => {
    api
      .setNewCard(values)
      .then((card) => {
        card.myUserId = card.owner._id
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

const popupWithAvatarInfo = new PopupWithForm(popupAvatarSelector, {
  handleFormSubmit: (data) => {
    api
      .setNewAvatar(data)
      .then((user) => {
        userInfo.setUserAvatar({ name: user.name, link: user.avatar })
      })
      .catch((err) => console.log(`Error: ${err}`))
  },
})
popupWithAvatarInfo.setEventListeners()

btnAvatar.addEventListener('click', () => {
  popupWithAvatarInfo.open()
})
