const btnEdit = document?.querySelector('.profile__edit')
const profileName = document?.querySelector('.profile__name')
const profileJob = document?.querySelector('.profile__job')

const popupProfile = document?.querySelector('.popup')
const popupForm = popupProfile?.querySelector('.popup__form')
const btnClose = popupProfile?.querySelector('.popup__close')
const inputName = popupProfile?.querySelector('.popup__input_type_name')
const inputJob = popupProfile?.querySelector('.popup__input_type_job')

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

const closePopup = () => {
  popupProfile.classList.remove('popup_opened')
}

btnEdit.addEventListener('click', () => {
  popupProfile.classList.add('popup_opened')
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent
})

btnClose.addEventListener('click', closePopup)

popupForm.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = inputName.value
  profileJob.textContent = inputJob.value

  closePopup()
})
