const editProfileBtn = document.querySelector('.profile__edit-btn')
const closeProfilePopupBtn = document.querySelector('.popup__close-btn')
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const profileForm = document.querySelector('.popup__form_type_profile')
const placeCardTemplate = document.querySelector('#place-card-template').content
const profileNameText = document.querySelector('.profile__name')
const popupNameText = document.querySelector('.input_type_name')
const profileAboutText = document.querySelector('.profile__about')
const popupAboutText = document.querySelector('.input_type_about')
const cardTitleInput = document.querySelector('.input_type_card-title')
const cardLinkInput = document.querySelector('.input_type_card-link')
const imagePopup = document.querySelector('.popup_type_fullscreen-image')
const imagePopupImage = document.querySelector('.popup__image')
const imagePopupCaption = document.querySelector('.popup__caption')
const placeCards = document.querySelector('.places-grid')
const popupAddCard = document.querySelector('.popup_type_add-card')
const addCardButton = document.querySelector('.profile__add-btn')
const addCardPopupCloseBtn = popupAddCard.querySelector('.popup__close-btn')
const formAddCard = document.querySelector('.popup__form_type_add-card')
const fullscreenImagePopupCloseBtn = imagePopup.querySelector('.popup__close-btn')

//Функция открытия любого попапа
function openPopup(popup) {
            popup.classList.add('popup_opened')
}

//Функция закрытия любого попапа
function closePopup(popup) {
            popup.classList.remove('popup_opened')
}

function showEditProfilePopup() {
    popupNameText.value = profileNameText.textContent
    popupAboutText.value = profileAboutText.textContent
    openPopup(popupEditProfile)
}

function submitEditProfileForm(evt) {
    evt.preventDefault()
    profileNameText.textContent = popupNameText.value
    profileAboutText.textContent = popupAboutText.value
    closePopup(popupEditProfile)
}

//Добавление карточек пользователем
function submitAddCardForm(evt) {
    evt.preventDefault()
    const cardTitle = cardTitleInput.value
    const cardLink = cardLinkInput.value
    formAddCard.reset()
    placeCards.prepend(createCard(cardTitle,cardLink))
    closePopup(popupAddCard)
}

//Логика попапа полноэкранного изображения
function showFullscreenImagePopup(target) {
    const imageUrl = target.querySelector('.place-card__image').src
    const imageTitle = target.querySelector('.place-card__title').textContent
    imagePopupImage.src = imageUrl
    imagePopupCaption.textContent = imageTitle
    imagePopupImage.alt = imageTitle
    openPopup(imagePopup)
}

//Начальная загрузка карточек
function loadInitialCards() {
    initialCards.forEach((item) => {
        cardName = item.name
        cardLink = item.link
        placeCards.prepend(createCard(cardName, cardLink))
    })
}

//Функция создания карточки
function createCard(title, link) {
    const cardElement = placeCardTemplate.querySelector('.place-card').cloneNode(true)

    const cardElementLikeBtn = cardElement.querySelector('.place-card__like-btn')
    cardElementLikeBtn.addEventListener('click', toggleLike)

    const cardElementDelBtn = cardElement.querySelector('.place-card__del-btn')
    cardElementDelBtn.addEventListener('click', removeCard)

    const cardElementImageBtn = cardElement.querySelector('.place-card__image')
    cardElementImageBtn.addEventListener('click', zoomCard)

    cardElement.querySelector('.place-card__image').src =link
    cardElement.querySelector('.place-card__title').textContent = title
    cardElementImageBtn.alt = title
    return cardElement
}

//Операции с карточкой
function toggleLike(event) {
    console.log(event);
    event.target.classList.toggle('place-card__like-btn_active')
}

function removeCard(event) {
    console.log(event.target.closest('.place-card'));
    event.target.closest('.place-card').remove()
}

function zoomCard(event) {
    const placeCard = event.target.closest('.place-card')
    showFullscreenImagePopup(placeCard)
}

loadInitialCards()


//Валидация форм

function setEventListeners (formElement){
    const inputList = Array.from(formElement.querySelectorAll('.input'))
    const buttonElement = formElement.querySelector('.popup__submit-btn')
    toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElement)=>{
        inputElement.addEventListener('input', ()=>{
            checkInputValidity(inputElement, formElement)
            toggleButtonState(inputList, buttonElement)
        })
    })
}

function showInputError (formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add('input_error')
    errorElement.textContent = errorMessage
    errorElement.classList.add('popup__error_active')
}

function hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = ''
    errorElement.classList.remove('popup__error_active')
    inputElement.classList.remove('input_error')
}

function checkInputValidity (inputElement, formElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement)
    }
}

function enableValidation () {
    const formList = Array.from(document.querySelectorAll('.popup__form'))
    formList.forEach((formElement)=>{
        formElement.addEventListener('submit', (evt)=>{
            evt.preventDefault()
        })
        setEventListeners(formElement)
    })
}
enableValidation()

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
      })
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-btn_inactive')
    } else {
        buttonElement.classList.remove('popup__submit-btn_inactive')
    }
}













editProfileBtn.addEventListener('click', showEditProfilePopup)
closeProfilePopupBtn.addEventListener('click', () => {closePopup(popupEditProfile)})
profileForm.addEventListener('submit', submitEditProfileForm)
addCardButton.addEventListener('click', () => {openPopup(popupAddCard)})
addCardPopupCloseBtn.addEventListener('click', () => {closePopup(popupAddCard)})
fullscreenImagePopupCloseBtn.addEventListener('click', () => {closePopup(imagePopup)})
formAddCard.addEventListener('submit', submitAddCardForm)