import Popup from './Popup.js'
import { imagePreview, imageCaption } from '../utils/constants.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(name, link) {
    super.open()

    imagePreview.src = link
    imagePreview.alt = name
    imageCaption.textContent = name
  }
}
