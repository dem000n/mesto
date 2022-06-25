const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const editProfileBtn = document.querySelector('.profile__edit-btn')
const closeProfilePopupBtn = document.querySelector('.popup__close-btn')
const editProfilePopup = document.querySelector('.popup_type_edit-profile')
const form = document.querySelector('.popup__form')
let profileNameText = document.querySelector('.profile__name')
let popupNameText = document.querySelector('.input_type_name')
let profileAboutText = document.querySelector('.profile__about')
let popupAboutText = document.querySelector('.input_type_about')


editProfileBtn.addEventListener('click', showEditProfilePopup)
closeProfilePopupBtn.addEventListener('click', hideEditProfilePopup)
form.addEventListener('submit', popupSubmitHandler)


function showEditProfilePopup() {
    popupNameText.value = profileNameText.textContent
    popupAboutText.value = profileAboutText.textContent
    editProfilePopup.classList.add('popup_opened')
}

function hideEditProfilePopup() {
    editProfilePopup.classList.remove('popup_opened')
}

function popupSubmitHandler(evt) {
    evt.preventDefault()
    profileNameText.textContent = popupNameText.value
    profileAboutText.textContent = popupAboutText.value
    hideEditProfilePopup()
}



const addCardPopup = document.querySelector('.popup_type_add-card')

const addCardButton = document.querySelector('.profile__add-btn')
addCardButton.addEventListener('click', showAddCardPopup)

const addCardPopupCloseBtn = addCardPopup.querySelector('.popup__close-btn')
addCardPopupCloseBtn.addEventListener('click', hideAddCardPopup)

function showAddCardPopup() {
    addCardPopup.classList.add('popup_opened')
}

function hideAddCardPopup () {
    addCardPopup.classList.remove('popup_opened')
}





function loadInitialCards() {
    const placeCardTemplate = document.querySelector('#place-card-template').content

    initialCards.forEach((card) => {
        const placeCardElement = placeCardTemplate.querySelector('.place-card').cloneNode(true)
        const placeCards = document.querySelector('.places-grid')
        placeCardElement.querySelector('.place-card__image').src = card.link
        placeCardElement.querySelector('.place-card__title').textContent = card.name
        placeCards.append(placeCardElement);
    })
}

loadInitialCards()