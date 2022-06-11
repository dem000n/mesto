const editProfileBtn = document.querySelector('.profile__edit-btn')
const popup = document.querySelector('.popup')
// console.log(editProfileBtn)

function showEditProfilePopup() {
    popup.classList.add('popup_opened')
    console.log(editProfileBtn)
}

editProfileBtn.addEventListener('click', showEditProfilePopup)
