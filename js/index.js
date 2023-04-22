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
const cardTemplate = document.querySelector('#gallery-template').content
// попап с информацией о месте
const popupAddCards = document.querySelector('.popup_gallery')
const popupAddCardsForm = popupAddCards.querySelector('.popup__form')
const inputPlace = popupAddCards.querySelector('.popup__input_type_place')
const inputLink = popupAddCards.querySelector('.popup__input_type_link')
// попап с картинкой
const popupPicture = document.querySelector('.popup_picture')
const imageOnScreen = popupPicture.querySelector('.popup__img')
const imageCaption = popupPicture.querySelector('.popup__caption')

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

// функция создания новой карточки
function createCard(name, link) {
  const card = cardTemplate.querySelector('.gallery__item').cloneNode(true)

  const galleryImage = card.querySelector('.gallery__image')
  galleryImage.src = link
  galleryImage.alt = name
  galleryImage.addEventListener('click', () => {
    openPopup(popupPicture)
    imageOnScreen.src = link
    imageOnScreen.alt = name
    imageCaption.textContent = name
  })

  card.querySelector('.gallery__like').addEventListener('click', (event) => {
    event.target.classList.toggle('gallery__like_active')
  })

  card.querySelector('.gallery__trash').addEventListener('click', () => {
    card.remove()
  })

  card.querySelector('.gallery__name').textContent = name

  return card
}

// функция добавления новой карточки
function addCard(newCard) {
  gallery.prepend(newCard)
}

initialCards.forEach((item) => {
  addCard(createCard(item.name, item.link))
})

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
  addCard(createCard(inputPlace.value, inputLink.value))
  popupAddCardsForm.reset()
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
    popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup')) {
        closePopup(popup)
      }
    })
  })
}
closePopupByOverlay()

function closePopupByEsc() {
  document.onkeydown = function (event) {
    if (event.key === 'Escape') {
      const popupToClose = document.querySelector('.popup_opened')
      closePopup(popupToClose)
    }
  }
}
closePopupByEsc()
