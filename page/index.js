import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input:invalid",
  errorClass: ".popup__input-error",
};

// --- Instancias ---

// 1. Información de Usuario
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about-me",
});

// 2. Popup de Imagen
const imagePopup = new PopupWithImage("#popup_image");
imagePopup.setEventListeners();

// 3. Función para crear tarjetas (reutilizable)

// 4. Sección de Tarjetas
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

const createCard = (data) => {
  const card = new Card(data, "#card__template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
};

cardSection.renderItems();

// 5. Popup Formulario Perfil
const profilePopup = new PopupWithForm("#popup-profile", (data) => {
  userInfo.setUserInfo(data);
  profilePopup.close();
});
profilePopup.setEventListeners();

// 6. Popup Formulario Nuevo Lugar
const placePopup = new PopupWithForm("#popup-place", (data) => {
  // data viene con 'title' y 'picture' según los names de los inputs en el HTML
  const newCardElement = createCard({ name: data.title, link: data.picture });
  cardSection.addItem(newCardElement);
  placePopup.close();
});
placePopup.setEventListeners();

// --- Event Listeners de Botones ---

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const { name, about } = userInfo.getUserInfo();
    document.querySelector("#name-input").value = name;
    document.querySelector("#description-input").value = about;
    profilePopup.open();
    console.log("click profile popup");
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  placePopup.open();
});

// --- Validación ---
const profileValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form"),
);
const cardValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-card-popup"),
);
profileValidator.setEventListeners();
cardValidator.setEventListeners();
