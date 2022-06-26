const editProfileBtn = document.querySelector('.profile__edit-btn')
const closeProfilePopupBtn = document.querySelector('.popup__close-btn')
const editProfilePopup = document.querySelector('.popup_type_edit-profile')
const profileForm = document.querySelector('.popup__form_type_profile')
const placeCardTemplate = document.querySelector('#place-card-template').content
let profileNameText = document.querySelector('.profile__name')
let popupNameText = document.querySelector('.input_type_name')
let profileAboutText = document.querySelector('.profile__about')
let popupAboutText = document.querySelector('.input_type_about')


editProfileBtn.addEventListener('click', showEditProfilePopup)
closeProfilePopupBtn.addEventListener('click', hideEditProfilePopup)
profileForm.addEventListener('submit', popupSubmitHandler)


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


//Логика попапа для добавления карточки
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


//Добавление карточек пользователем
const addCardForm = document.querySelector('.popup__form_type_add-card')
addCardForm.addEventListener('submit', AddCardPopupSubmitHandler)

function AddCardPopupSubmitHandler(evt) {
    evt.preventDefault()
    let cardTitle = document.querySelector('.input_type_card-title').value
    let cardLink = document.querySelector('.input_type_card-link').value
    //Очищаем данные полей
    let cardTitleInput = document.querySelector('.input_type_card-title')
    let cardLinkInput = document.querySelector('.input_type_card-link')
    cardTitleInput.value = ''
    cardLinkInput.value = ''
    
    addCard(cardTitle, cardLink)
    hideAddCardPopup ()
}

function addCard (title, link){
    const placeCardElement = placeCardTemplate.querySelector('.place-card').cloneNode(true)
    const placeCards = document.querySelector('.places-grid')
    placeCardElement.querySelector('.place-card__image').src = link
    placeCardElement.querySelector('.place-card__title').textContent = title
    placeCards.prepend(placeCardElement);
}



//Начальная загрузка карточек
function loadInitialCards() {
    initialCards.forEach((card) => {
        const placeCardElement = placeCardTemplate.querySelector('.place-card').cloneNode(true)
        const placeCards = document.querySelector('.places-grid')
        placeCardElement.querySelector('.place-card__image').src = card.link
        placeCardElement.querySelector('.place-card__title').textContent = card.name
        placeCards.prepend(placeCardElement);
    })
}

loadInitialCards()

//Операции с карточкой
const placesGrid = document.querySelector('.places-grid')
placesGrid.addEventListener('click', cardsOperations)

function cardsOperations(event) {
    //Лайк
    if (event.target.classList.contains('place-card__like-btn')){
        event.target.classList.toggle('place-card__like-btn_active')
    //Удаление
    } else if (event.target.classList == 'place-card__del-btn'){
        event.target.closest('.place-card').remove()
        console.log(event.target.closest('.place-card'))
    //Увеличение
    } else if (event.target.classList == 'place-card__image'){
        const placeCard = event.target.closest('.place-card')
        showFullscreenImagePopup(placeCard)
    }
}

//Логика попапа полноэкранного изображения
function showFullscreenImagePopup(target) {
    const imagePopup = document.querySelector('.image-popup')
    const imagePopupImage = document.querySelector('.image-popup__image')
    const imagePopupCaption = document.querySelector('.image-popup__caption')
    const imageUrl = target.querySelector('.place-card__image').src
    const imageTitle = target.querySelector('.place-card__title').textContent
    
    imagePopupImage.src = imageUrl
    imagePopupCaption.textContent = imageTitle
    console.log(imageUrl, imageTitle);
    imagePopup.classList.add('image-popup_opened')
}

fullscreenImagePopupCloseBtn = document.querySelector('.image-popup__close-btn')
fullscreenImagePopupCloseBtn.addEventListener('click', (evt) => {
    evt.target.closest('.image-popup_opened').classList.remove('image-popup_opened')
})
