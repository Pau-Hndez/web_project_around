export class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(),
    );
    this._image.addEventListener("click", () => {
      console.log("click imagen");
      this._handleCardClick(this._name, this._link);
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
