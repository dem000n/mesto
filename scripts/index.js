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
const imagePopup = document.querySelector('.image-popup')
const imagePopupImage = document.querySelector('.image-popup__image')
const imagePopupCaption = document.querySelector('.image-popup__caption')


editProfileBtn.addEventListener('click', showEditProfilePopup)
closeProfilePopupBtn.addEventListener('click', () => {closePopup(popupEditProfile)})
profileForm.addEventListener('submit', submitEditProfileForm)

//Функция открытия любого попапа
function openPopup(popup) {
    switch (popup.classList[0]) {
        case 'popup':
            popup.classList.add('popup_opened')
            break
        case 'image-popup':
            popup.classList.add('image-popup_opened')
            break
    }

}

//Функция закрытия любого попапа
function closePopup(popup) {
    switch (popup.classList[0]) {
        case 'popup':
            popup.classList.remove('popup_opened')
            break
        case 'image-popup':
            popup.classList.remove('image-popup_opened')
            break
    }

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


//Логика попапа для добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card')

const addCardButton = document.querySelector('.profile__add-btn')
addCardButton.addEventListener('click', () => {openPopup(popupAddCard)})

const addCardPopupCloseBtn = popupAddCard.querySelector('.popup__close-btn')
addCardPopupCloseBtn.addEventListener('click', () => {closePopup(popupAddCard)})

//Добавление карточек пользователем
const formAddCard = document.querySelector('.popup__form_type_add-card')
formAddCard.addEventListener('submit', submitAddCardForm)

function submitAddCardForm(evt) {
    evt.preventDefault()
    const cardTitle = cardTitleInput.value
    const cardLink = cardLinkInput.value
    //Очищаем данные полей
    cardTitleInput.value = ''
    cardLinkInput.value = ''

    addCard(cardTitle, cardLink)
    closePopup(popupAddCard)
}

function addCard (title, link){
    const placeCardElement = placeCardTemplate.querySelector('.place-card').cloneNode(true)
    const placeCards = document.querySelector('.places-grid')
    placeCardElement.querySelector('.place-card__image').src = link
    placeCardElement.querySelector('.place-card__title').textContent = title
    placeCards.prepend(placeCardElement);
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

fullscreenImagePopupCloseBtn = document.querySelector('.image-popup__close-btn')
fullscreenImagePopupCloseBtn.addEventListener('click', () => {closePopup(imagePopup)})


//Начальная загрузка карточек
function loadInitialCards() {
    const placeCards = document.querySelector('.places-grid')
    initialCards.forEach((item) => {
        placeCards.prepend(createCard(item))
    })
}

loadInitialCards()

//Функция создания карточки
function createCard(card) {
    const cardElement = placeCardTemplate.querySelector('.place-card').cloneNode(true)

    const cardElementLikeBtn = cardElement.querySelector('.place-card__like-btn')
    cardElementLikeBtn.addEventListener('click', toggleLike)

    const cardElementDelBtn = cardElement.querySelector('.place-card__del-btn')
    cardElementDelBtn.addEventListener('click', removeCard)

    const cardElementImageBtn = cardElement.querySelector('.place-card__image')
    cardElementImageBtn.addEventListener('click', zoomCard)

    cardElement.querySelector('.place-card__image').src = card.link
    cardElement.querySelector('.place-card__title').textContent = card.name
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