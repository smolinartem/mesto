// BUTTONS
export const btnEdit = document.querySelector('.profile__edit')
export const btnAdd = document.querySelector('.profile__add')
export const btnAvatar = document.querySelector('.profile__avatar')
//FORMS
export const userForm = document.forms['popup-user']
export const cardsForm = document.forms['popup-gallery']
export const avatarForm = document.forms['popup-avatar']
// SELECTORS
export const gallerySelector = '.gallery__list'
export const popupCardSelector = '.popup_gallery'
export const popupUserSelector = '.popup_user'
export const popupAvatarSelector = '.popup_avatar'
export const userNameSelector = '.profile__name'
export const userJobSelector = '.profile__job'
export const userAvatarSelector = '.profile__img'

export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

export const serverConfig = {
  token: 'ba426b9f-ef34-4346-9cd7-a3db6e837a2d',
  url: 'https://nomoreparties.co/v1/cohort-68',
}
