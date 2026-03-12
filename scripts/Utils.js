import Card from "./Card.js";

const popup = document.querySelector("#popup-place");
const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__about-me");
const nameInput = document.querySelector(".modal__input_type_name");
const jobInput = document.querySelector(".modal__input_type_description");
const photoPopupClose = document.querySelector(".photo__close");
const titleInput = document.querySelector("#card-name");
const pictureInput = document.querySelector("#card-description");
const photoPopup = document.querySelector(".photo");
const photoBigPopup = photoPopup.querySelector(".photo__big");
const photoPopupTitle = photoPopup.querySelector(".photo__name");
const wrap = document.querySelector(".content__places");
const modal = document.querySelector("#popup-profile");

//funciones para el modal de edit profile
function openModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  modal.classList.add("modal_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(modal);
}
//función para cerrar al dar click en el overlay
function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
photoPopup.addEventListener("mousedown", (evt) => {
  if (evt.target === evt.currentTarget) {
    photoPopup.classList.remove("photo_is-opened");
  }
});
//función para que se cierre con la tecla ESC
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    const openedPhoto = document.querySelector(".photo_is-opened");

    if (openedModal) {
      closePopup(openedModal);
    }

    if (openedPhoto) {
      openedPhoto.classList.remove("photo_is-opened");
    }
  }
}

const renderCard = (data, wrap) => {
  const card = new Card(data, "#card__template");
  const cardElement = card.generateCard();
  wrap.prepend(cardElement);
};

//función del add button = open
function openPopup() {
  nameInput.value = "";
  jobInput.value = "";
  popup.classList.add("modal_is-opened");
}
//función del boton cerrar
function closePopup(popup) {
  popup.classList.remove("modal_is-opened");
}
//función para que se cree una nueva card
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const title = titleInput.value.trim();
  const picture = pictureInput.value.trim();

  const newCard = {
    name: title,
    link: picture,
  };

  renderCard(newCard, wrap);
  closePopup(popup);
  cardForm.reset();
}
//función para el popup de la foto grande
function handlePhotoPopup(evt) {
  const clickedImage = evt.target;
  const card = clickedImage.closest(".card");
  const title = card.querySelector(".card__title").textContent;

  photoBigPopup.src = clickedImage.src;
  photoBigPopup.alt = clickedImage.alt;
  photoPopupTitle.textContent = title;

  photoPopup.classList.add("photo_is-opened");
}
//función para cerrar el popup de la foto
function photoClose() {
  photoPopup.classList.remove("photo_is-opened");
}
//Eventos
document.addEventListener("keydown", handleEscClose);

photoPopupClose.addEventListener("click", photoClose);

export {
  handleCardFormSubmit,
  closePopup,
  openPopup,
  renderCard,
  handleOverlayClose,
  handleProfileFormSubmit,
  openModal,
  handlePhotoPopup,
};
