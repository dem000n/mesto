// const settings = {
//     formSelector: '.popup__form',
//     inputSelector: '.input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   }


function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector))
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        setEventListeners(formElement, settings)
    })
}
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'input_error',
    errorClass: 'popup__error_active'
});


function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
    const buttonElement = formElement.querySelector(settings.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, settings)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement, formElement, settings)
            toggleButtonState(inputList, buttonElement, settings)
        })
    })
}

function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(settings.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(settings.errorClass)
}

function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = ''
    errorElement.classList.remove(settings.errorClass)
    inputElement.classList.remove(settings.inputErrorClass)
}

function checkInputValidity(inputElement, formElement, settings) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings)
    } else {
        hideInputError(formElement, inputElement, settings)
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass)
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass)
    }
}
