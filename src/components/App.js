import {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };
  
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

  const [isConfirm, setConfirm] = useState(false);
  const handleConfirm = (card) => {
    setSelectedCard(card);
    setConfirm(true);
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInititalCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => console.log(`Error: ${err}`));
  }, []);

  const handleUpdateUser = (data) => {
    api.editUserInfo(data.name, data.about)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  const handleUpdateAvatar = (data) => {
    api.editUserAvatar(data.link)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  const handleAddPlaceSubmit = (data) => {
    api.addCard(data.name, data.link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  const handleDeleteCard = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirm(false);
    setSelectedCard({});
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__content'>
        <Header/>
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onLikeClick={handleCardLike}
          onDeleteClick={handleConfirm}
        />
        <Footer/>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onEditAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdate={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleAddPlaceSubmit}
        />
        <ConfirmPopup
          isOpen={isConfirm}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCard}
          card={selectedCard}
        />
        <ImagePopup
          name={'image'}
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;