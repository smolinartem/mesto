const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]
// ! кнопки
const btnEdit = document?.querySelector('.profile__edit')
const btnAdd = document.querySelector('.profile__add')
const btnClose = document?.querySelectorAll('.popup__close')
/* const btnLike = document.querySelectorAll('.gallery__like') */

const userName = document?.querySelector('.profile__name')
const userJob = document?.querySelector('.profile__job')
// ! попап с информацией о пользователе
const popupUser = document?.querySelector('.popup_user')
const popupUserForm = popupUser?.querySelector('.popup__form')
const inputName = popupUser?.querySelector('.popup__input_type_name')
const inputJob = popupUser?.querySelector('.popup__input_type_job')

const gallery = document.querySelector('.gallery__list')
const cardTemplate = document.querySelector('#gallery-template').content
// ! попап с информацией о месте
const popupAddCards = document.querySelector('.popup_gallery')
const popupAddCardsForm = popupAddCards.querySelector('.popup__form')
const inputPlace = popupAddCards.querySelector('.popup__input_type_place')
const inputLink = popupAddCards.querySelector('.popup__input_type_link')
// ! попап с картинкой
const popupPicture = document.querySelector('.popup_picture')
const imageOnScreen = popupPicture.querySelector('.popup__img')
const imageCaption = popupPicture.querySelector('.popup__caption')

// ! функция открытия попапа
function popupOpen(popup) {
  popup.classList.add('popup_opened')
}
// ! функция закрытия попапа
function popupClose(popup) {
  popup.classList.remove('popup_opened')
}
// ! функция добавления новой карточки
function addCard(name, link) {
  const card = cardTemplate.querySelector('.gallery__item').cloneNode(true)

  card.querySelector('.gallery__image').src = link
  card.querySelector('.gallery__name').textContent = name

  card.querySelectorAll('.gallery__image').forEach((img) => {
    img.alt = name
    img.addEventListener('click', (event) => {
      popupOpen(popupPicture)

      imageOnScreen.src = img.src
      imageOnScreen.alt = img.alt
      imageCaption.textContent = img.alt
    })
  })

  card.querySelectorAll('.gallery__like').forEach((like) => {
    like.addEventListener('click', (event) => {
      event.target.classList.toggle('gallery__like_active')
    })
  })

  card.querySelectorAll('.gallery__trash').forEach((trash) => {
    trash.addEventListener('click', (event) => {
      event.target.closest('.gallery__item').remove()
    })
  })

  gallery.prepend(card)
}

initialCards.forEach((item) => {
  addCard(item.name, item.link)
})
// ! отрытие попапа user
btnEdit.addEventListener('click', () => {
  popupOpen(popupUser)
  inputName.value = userName.textContent
  inputJob.value = userJob.textContent
})
// ! отправка формы user
popupUserForm.addEventListener('submit', (event) => {
  event.preventDefault()
  userName.textContent = inputName.value
  userJob.textContent = inputJob.value

  popupClose(popupUser)
})
// ! отрытие попапа cards
btnAdd.addEventListener('click', () => {
  popupOpen(popupAddCards)
})
// ! отправка формы cards
popupAddCardsForm.addEventListener('submit', (event) => {
  event.preventDefault()
  addCard(inputPlace.value, inputLink.value)
  // ./images/jpeg/gallery-01.jpg
  popupClose(popupAddCards)
})
// ! закрытие попапов
btnClose.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const popupToClose = event.target.closest('.popup')
    popupClose(popupToClose)
  })
})
