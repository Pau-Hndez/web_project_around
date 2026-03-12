import { handlePhotoPopup } from "./Utils.js";
export class Card {
  constructor(data, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  _handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
  _handleDeleteClick(evt) {
    const button = evt.target;
    const card = button.closest(".card");
    card.remove();
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._image.addEventListener("click", (evt) => {
      this.handlePhotoPopup(evt);
    });
  }
  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__picture");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardTitle = this._element.querySelector(".card__title");

    this._cardTitle.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
