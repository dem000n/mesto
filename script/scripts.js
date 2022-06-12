const editProfileBtn = document.querySelector('.profile__edit-btn')
const closeProfilePopupBtn = document.querySelector('.popup__close-btn')
const popup = document.querySelector('.popup')
const form = document.querySelector('.popup__form')
let profileNameText = document.querySelector('.profile__name')
let popupNameText = document.querySelector('.popup__name')
let profileAboutText = document.querySelector('.profile__about')
let popupAboutText = document.querySelector('.popup__about')


editProfileBtn.addEventListener('click', showEditProfilePopup)
closeProfilePopupBtn.addEventListener('click', hideEditProfilePopup)
form.addEventListener('submit', popupSubmitHandler)


function showEditProfilePopup() {
    popupNameText.value = profileNameText.textContent
    popupAboutText.value =  profileAboutText.textContent
    popup.classList.add('popup_opened')
}

function hideEditProfilePopup() {
    popup.classList.remove('popup_opened')
}

function popupSubmitHandler(evt) {
    evt.preventDefault()
    profileNameText.textContent = popupNameText.value
    profileAboutText.textContent = popupAboutText.value
    hideEditProfilePopup()
}

