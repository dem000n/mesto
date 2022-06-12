const editProfileBtn = document.querySelector('.profile__edit-btn')
const closeProfilePopupBtn = document.querySelector('.popup__close-btn')
const popup = document.querySelector('.popup')
const popupSubmitBtn = document.querySelector('.popup__save-btn')


let popupNameText = document.querySelector('.profile__name').textContent
document.querySelector('.popup__name').value = popupNameText

let popupAboutText = document.querySelector('.profile__about').textContent
document.querySelector('.popup__about').value = popupAboutText

editProfileBtn.addEventListener('click', showEditProfilePopup)
closeProfilePopupBtn.addEventListener('click', hideEditProfilePopup)
popupSubmitBtn.addEventListener('click', popupSubmitHandler)


function showEditProfilePopup() {
    popup.classList.add('popup_opened')
}

function hideEditProfilePopup() {
    popup.classList.remove('popup_opened')
}

function popupSubmitHandler(evt) {
    evt.preventDefault()
    document.querySelector('.profile__name').childNodes[0].nodeValue = document.querySelector('.popup__name').value
    document.querySelector('.profile__about').textContent = document.querySelector('.popup__about').value
    popup.classList.remove('popup_opened')
}

