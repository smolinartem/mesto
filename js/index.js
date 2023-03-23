const btnEdit = document?.querySelector('.profile__button_type_edit')
const profileName = document?.querySelector('.profile__name')
const profileJob = document?.querySelector('.profile__job')

const popupProfile = document?.querySelector('.popup')
const popupForm = popupProfile?.querySelector('.popup__form')
const btnClose = popupProfile?.querySelector('.popup__button_type_close')
const inputName = popupProfile?.querySelector('.popup__input_type_name')
const inputJob = popupProfile?.querySelector('.popup__input_type_job')

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
