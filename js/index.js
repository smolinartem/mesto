const body = document?.body
const btnEdit = body?.querySelector('.button_type_edit')
const profileName = body?.querySelector('.profile__name')
const profileJob = body?.querySelector('.profile__job')

const popupProfile = body?.querySelector('.popup')
const popupForm = popupProfile?.querySelector('.popup__form')
const btnClose = popupProfile?.querySelector('.button_type_close')
const inputName = popupProfile?.querySelector('.popup__input_type_name')
const inputJob = popupProfile?.querySelector('.popup__input_type_job')

btnEdit.addEventListener('click', () => {
  popupProfile.classList.add('popup_opened')
  body.classList.add('no-scroll')
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent
})

btnClose.addEventListener('click', () => {
  popupProfile.classList.remove('popup_opened')
  body.classList.remove('no-scroll')
})

popupForm.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = inputName.value
  profileJob.textContent = inputJob.value

  /*   console.log(isNaN(inputName.value)) */

  popupProfile.classList.remove('popup_opened')
  body.classList.remove('no-scroll')
})
