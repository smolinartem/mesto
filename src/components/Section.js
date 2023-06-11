export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector)
  }

  renderElement(element) {
    this._container.prepend(element)
  }
}
