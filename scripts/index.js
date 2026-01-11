//padres
const modal = document.querySelector(".modal");
const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");
const wrap = document.querySelector(".content__places");
const popup = document.querySelector(".popup");
const cardWrap = cardTemplate.querySelector(".card");
const photoPopup = document.querySelector(".photo");

//hijos
const profileFormElement = document.querySelector(".modal__form");
const profileTitle = document.querySelector(".content__name");
const profileDescription = document.querySelector(".content__about-me");
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const popupFormElement = document.querySelector(".popup__form");
const titleInput = popupFormElement.querySelector(".popup__input_type_place");
const pictureInput = popupFormElement.querySelector(
  ".popup__input_type_picture-link"
);
const photoBigPopup = photoPopup.querySelector(".photo__big");
const photoPopupTitle = photoPopup.querySelector(".photo__name");
//buttons
const profileEditButton = document.querySelector(".content__edit-button");
const modalCloseButton = document.querySelector(".modal__close");
const saveButton = profileFormElement.querySelector(".modal__save");
const popupAddButton = document.querySelector(".content__add-button");
const popupCloseButton = document.querySelector(".popup__close");
const popupSaveButton = popupFormElement.querySelector(".popup__save");
const photoPopupClose = document.querySelector(".photo__close");

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
//función para que se vean las tarjetas
const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardElement);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardPicture = cardElement.querySelector(".card__picture");
  cardPicture.src = data.link;
  cardPicture.alt = data.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;

  likeButton.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardPicture.addEventListener("click", handlePhotoPopup);

  return cardElement;
};

function updateButtonColor() {
  if (nameInput.ariaValueMax.trim() === "" && jobInput.value.trim() === "") {
    saveButton.classList.add("white");
  } else {
    saveButton.classList.remove("white");
  }
}
//funciones para el modal de edit profile
function openModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  modal.classList.add("modal_is-opened");
  updateButtonColor();
}
function closeModal() {
  modal.classList.remove("modal_is-opened");
}

function handleProfileFormSubmit(evt) {
  console.log(evt.preventDefault(), "Form submission prevented");
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}
//funciones para validar formulario
profileFormElement.addEventListener("submit", function(evt){
  evt.preventDefault();
});


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
//función del add button = open
function openPopup() {
  titleInput.value = "";
  pictureInput.value = "";
  popup.classList.add("popup_is-opened");
  updateButtonColor();
}
//función del boton cerrar popup
function closePopup() {
  popup.classList.remove("popup_is-opened");
}
//función para que se cree una nueva card
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const title = titleInput.value.trim();
  const picture = pictureInput.value.trim();

  if (!title || !picture) {
    alert("Por favor completa ambos campos.");
    return;
  }

  const newCard = {
    name: title,
    link: picture,
  };

  renderCard(newCard, wrap);
  closePopup();
  popupFormElement.reset();
}

const renderCard = (data, wrap) => {
  console.log(data);
  wrap.prepend(getCardElement(data));
};

initialCards.forEach((data) => {
  renderCard(data, wrap);
});
//función para el botón borrar
function handleDeleteCard(evt) {
  const button = evt.target;
  const card = button.closest(".card");
  card.remove();
}
//función para el like button active
function handleLikeIcon(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

//Eventos
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);
popupAddButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
popupFormElement.addEventListener("submit", handleCardFormSubmit);
photoPopupClose.addEventListener("click", photoClose);
