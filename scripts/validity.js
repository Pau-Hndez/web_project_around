//hijos de modal form

export const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_inactive",
  inputErrorClass: ".modal__input:invalid",
  errorClass: ".modal__input-error",
};

function handleInput(modalForm, formInput, errorClass) {
  checkInputValidity(modalForm, formInput, errorClass);
}
function checkInputValidity(modalForm, formInput, errorClass) {
  if (!formInput.validity.valid) {
    showError(modalForm, formInput, errorClass, formInput.validationMessage);
  } else {
    hideError(modalForm, formInput, errorClass);
  }
}
function showError(modalForm, formInput, errorClass, errorMessage) {
  const errorElementId = `.${formInput.id}-error`;
  const errorElement = modalForm.querySelector(errorElementId);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  formInput.classList.add(validationConfig.inputErrorClass);
}
function hideError(modalForm, formInput, errorClass) {
  const errorElement = modalForm.querySelector(`.${formInput.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
  formInput.classList.remove(validationConfig.inputErrorClass);
}
//función para desbloquear el boton save
const hasInvalidInput = (inputList) => {
  return inputList.some((errorElement) => {
    return !errorElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
//formElement = modalForm
export const setEventListeners = (modalForm) => {
  const inputList = Array.from(
    modalForm.querySelectorAll(validationConfig.inputSelector),
  );
  const buttonElement = modalForm.querySelector(
    validationConfig.submitButtonSelector,
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(modalForm, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
