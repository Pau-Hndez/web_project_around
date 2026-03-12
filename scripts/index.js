import {
  handleCardFormSubmit,
  closePopup,
  openPopup,
  renderCard,
  handleOverlayClose,
  handleProfileFormSubmit,
  openModal,
} from "./utils.js";
import { FormValidator } from "./FormValidator.js";

//content
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];
const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_inactive",
  inputErrorClass: "modal__input:invalid",
  errorClass: ".modal__input-error",
};

//const que se quedan
const popup = document.querySelector("#popup-place");
const modal = document.querySelector("#popup-profile");
const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");
const profileForm = document.querySelector("#edit-profile-form");
const cardForm = document.querySelector("#edit-card-popup");
const wrap = document.querySelector(".content__places");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupAddButton = document.querySelector(".profile__add-button");
const modalCloseButton = document.querySelector("#popup-profile-close");
const popupCloseButton = document.querySelector("#popup-place-close");

const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, cardForm);
profileValidator.setEventListeners();
cardValidator.setEventListeners();

//event listeners
cardForm.addEventListener("submit", handleCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
modal.addEventListener("mousedown", handleOverlayClose);
popup.addEventListener("mousedown", handleOverlayClose);
profileEditButton.addEventListener("click", openModal);
popupAddButton.addEventListener("click", openPopup);
modalCloseButton.addEventListener("click", () => {
  closePopup(modal);
});
popupCloseButton.addEventListener("click", () => {
  closePopup(popup);
});
//render card
initialCards.forEach((data) => {
  renderCard(data, wrap);
});
