export class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleLike,
    handleDislike,
    handleDelete,
  ) {
    this._data = data;
    this._handleImageClick = handleImageClick;
    this._templateSelector = templateSelector;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._handleDelete = handleDelete;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
  }
  _isLiked() {
    return this._data.isLiked;
  }
  getId() {
    return this._id;
  }
  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _updateLikes(data) {
    this._data = data;

    if (data.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._isLiked()) {
        this._handleDislike(this);
      } else {
        this._handleLike(this);
      }
    });
    this._deleteButton.addEventListener("click", () =>
      this._handleDelete(this),
    );
    this._image.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
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
