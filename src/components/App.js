import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {useState, useEffect} from 'react';

const App = () => {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const [openedCard, setOpenedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const handleCardClick = (card) => {
    setOpenedCard(card);
    setImagePopupOpen(true);
  };

  const [isConfirm, setConfirm] = useState(false);
  const handleConfirm = () => {
    setConfirm(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirm(false);
    setOpenedCard({});
  };

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isConfirm) {
      window.addEventListener('keydown', handleEscClose);
    }

    return () => window.removeEventListener('keydown', handleEscClose);
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isImagePopupOpen, isConfirm]);

  return (
    
      <div className='page__content'>
        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer/>
        <PopupWithForm
          name='edit-avatar'
          id='edit-avatar-popup'
          isOpen={isEditAvatarPopupOpen}
          title='Обновить аватар'
          submitText='Сохранить'
          onClose={closeAllPopups}
        >
          <div className='popup__form-field'>
            <input className='popup__input popup__input_type_link' name='input-avatar' id='avatar-url'
                   type='url' placeholder='Ссылка на картинку' required/>
            <span className='popup__input-error popup__input-error_active' id='avatar-url-error'/>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name='edit-profile'
          id='edit-profile-popup'
          isOpen={isEditProfilePopupOpen}
          title='Редактировать профиль'
          submitText='Сохранить'
          onClose={closeAllPopups}
        >
          <div className='popup__form-field'>
            <input className='popup__input popup__input_type_name' name='input-profile-name' id='profile-name'
                   type='text' placeholder='Имя' minLength='2' maxLength='40' required/>
            <span className='popup__input-error popup__input-error_active' id='profile-name-error'/>
          </div>
          <div className='popup__form-field'>
            <input className='popup__input popup__input_type_text' name='input-profile-description' id='profile-description'
                   type='text' placeholder='Вид деятельности' minLength='2' maxLength='200' required/>
            <span className='popup__input-error popup__input-error_active' id='profile-description-error'/>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name='add-card'
          id='add-card-popup'
          isOpen={isAddPlacePopupOpen}
          title='Новое место'
          submitText='Сохранить'
          onClose={closeAllPopups}
        >
          <div className='popup__form-field'>
            <input className='popup__input popup__input_type_name' name='input-card-name' id='card-name'
                   type='text' placeholder='Название' minLength='2' maxLength='30' required/>
            <span className='popup__input-error popup__input-error_active' id='card-name-error'/>
          </div>
          <div className='popup__form-field'>
            <input className='popup__input popup__input_type_link' name='input-card-link' id='card-link'
                   type='url' placeholder='Ссылка на картинку' required/>
            <span className='popup__input-error popup__input-error_active' id='card-link-error'/>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name='confirm'
          id='confirm-popup'
          title='Вы уверены?'
          isOpen={isConfirm}
          submitText='Да'
          onClose={closeAllPopups}
          onConfirmClick={handleConfirm}
        />
        <ImagePopup
          name={'image'}
          card={openedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    
  );
};

export default App;