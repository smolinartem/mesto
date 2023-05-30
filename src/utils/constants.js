// BUTTONS
export const btnEdit = document.querySelector('.profile__edit')
export const btnAdd = document.querySelector('.profile__add')
//FORMS
export const userForm = document.forms['popup-user']
export const cardsForm = document.forms['popup-gallery']
// INPUTS
export const inputName = document.querySelector('.popup__input_type_name')
export const inputJob = document.querySelector('.popup__input_type_job')
// SELECTORS
export const gallerySelector = '.gallery__list'
export const popupCardSelector = '.popup_gallery'
export const popupUserSelector = '.popup_user'
export const userNameSelector = '.profile__name'
export const userJobSelector = '.profile__job'
// IMAGE PREVIEW
export const imagePreview = document.querySelector('.popup__img')
export const imageCaption = document.querySelector('.popup__caption')

export const initialCards = [
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

export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}
