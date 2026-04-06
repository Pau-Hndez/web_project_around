import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector(".popup__title");
    this._button = this._popup.querySelector(".popup__save");
  }
}
//la función de eliminar la tarjeta se aplica aqui también o solo en el API
