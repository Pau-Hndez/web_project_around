import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "0f55971b-c059-4ebb-9b77-a79df8314408",
    "Content-Type": "application/json",
  },
});

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
  avatarSelector: ".profile__img-picture",
});

// 2. Popup de Imagen
const imagePopup = new PopupWithImage("#popup_image");
imagePopup.setEventListeners();

let initialCards = [];
// 3. Función para crear tarjetas
const createCard = (data) => {
  const card = new Card(
    data,
    "#card__template",
    (name, link) => {
      imagePopup.open(name, link);
    },
    (cardInstance) => {
      // LIKE
      api
        .addLike(cardInstance._id)
        .then((res) => {
          cardInstance._updateLikes(res);
        })
        .catch(console.error);
    },
    (cardInstance) => {
      // DISLIKE
      api
        .removeLike(cardInstance._id)
        .then((res) => {
          cardInstance._updateLikes(res);
        })
        .catch(console.error);
    },
    (card) => {
      // DELETE (el que ya tienes)
      confirmationPopup.open();
      confirmationPopup.setSubmitAction(() => {
        api
          .deleteCard(card._id)
          .then(() => {
            card.removeCard();
            confirmationPopup.close();
          })
          .catch(console.error);
      });
    },
  );
  return card.generateCard();
};
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
// 4. Sección de Tarjetas
api.getInitialCards().then((response) => {
  initialCards.push(...response);
  cardSection.renderItems();
});
api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data.avatar);
});

// 7. Popup para confirmar borrar tarjeta
const confirmationPopup = new PopupWithConfirmation("#popup_delete");

confirmationPopup.setEventListeners();

// 5. Popup Formulario Perfil
const profilePopup = new PopupWithForm("#popup-profile", (data) => {
  api.editProfile(data.name, data.about).then(() => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.description,
    });
    profilePopup.close();
  });
});
profilePopup.setEventListeners();

// 6. Popup Formulario Nuevo Lugar
const placePopup = new PopupWithForm("#popup-place", (data) => {
  api.addCard(data.title, data.picture).then(() => {
    const newCardElement = createCard({ name: data.title, link: data.picture });
    cardSection.addItem(newCardElement);
    placePopup.close();
  });
});
placePopup.setEventListeners();

// 8. Popup formulario foto de perfil

const picturePopup = new PopupWithForm("#popup-profile-picture", (data) => {
  api
    .editProfilePicture({ avatar: data.avatar })
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      picturePopup.close();
    })
    .catch(console.error);
});
picturePopup.setEventListeners();

// --- Event Listeners de Botones ---
document.querySelector(".profile__add-button").addEventListener("click", () => {
  placePopup.open();
});

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const { name, about } = userInfo.getUserInfo();
    document.querySelector("#name-input").value = name;
    document.querySelector("#description-input").value = about;
    profilePopup.open();
  });

document
  .querySelector(".profile__edit-picture")
  .addEventListener("click", () => {
    picturePopup.open();
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
