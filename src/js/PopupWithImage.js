import Popup from './Popup.js'

const popupPicture = document.querySelector('.popup_picture')
const imageOnScreen = popupPicture.querySelector('.popup__img')
const imageCaption = popupPicture.querySelector('.popup__caption')

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(name, link) {
    super.open()

    imageOnScreen.src = link
    imageOnScreen.alt = name
    imageCaption.textContent = name
  }
}
