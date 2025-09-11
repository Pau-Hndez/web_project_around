const cardWrap = document.querySelector(".content__places");
const modal = document.querySelector(".modal");
const profileFormElement = document.querySelector(".modal__form");

const profileEditButton = document.querySelector(".content__edit-button");
const modalCloseButton = document.querySelector(".modal__close");
const profileTitle = document.querySelector(".content__name");
const profileDescription = document.querySelector(".content__about-me");

const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const saveButton = profileFormElement.querySelector(".modal__save");

function closeModal() {
  modal.classList.remove("modal_is-opened");
}
function updateButtonColor() {
  if (nameInput.ariaValueMax.trim() === "" && jobInput.value.trim() === "") {
    saveButton.classList.add("white");
  } else {
    saveButton.classList.remove("white");
  }
}
function openModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  modal.classList.add("modal_is-opened");
  updateButtonColor();
}

function handleProfileFormSubmit(evt) {
  console.log(evt.preventDefault(), "Form submission prevented");
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);
