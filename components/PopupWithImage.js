import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image-big");
    this._caption = this._popup.querySelector(".popup__image-name");
  }

  open(name, link) {
    console.log("funcionalidad popup image");
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
