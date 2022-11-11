import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const history = useHistory();

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

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState (false);
  const handleInfoTooltipPopup = () => {
    setIsInfoTooltipOpen(true);
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInititalCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => console.log(`Error: ${err}`));
  }, []);

  const tokenCheck = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.getContent(token)
        .then((data) => {
          if (data) {
            setUserData({ email: data.data.email});
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => console.log(`Error: ${err}`));
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(`Error: ${err}`));
    }
  }, [loggedIn]);

  const handleRegistration = (password, email) => {
    auth.register(password, email)
      .then(() => {
        setIsRegistered(true);
        handleInfoTooltipPopup();
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        setIsRegistered(false);
      })
      .finally(() => {
        handleInfoTooltipPopup();
      });
  };

  const handleLogin = (password, email) => {
    auth.authorize(password, email)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        setUserData({ email: email });
        history.push('/');
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        handleInfoTooltipPopup();
      })
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    history.push('/login');
    setLoggedIn(false);
  }

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
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isConfirm || isInfoTooltipOpen) {
      window.addEventListener('keydown', handleEscClose);
    }

    return () => window.removeEventListener('keydown', handleEscClose);
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isImagePopupOpen, isConfirm, isInfoTooltipOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__content'>
        <Header
          userData={userData}
          onSignOut={handleSignOut}
        />

        <Switch>
          <Route path='/sign-up'>
            <Register
              onRegister={handleRegistration}
              />
          </Route>
          <Route path='/sign-in'>
            <Login
              onLogin={handleLogin}
            />
          </Route>
          <ProtectedRoute
            path='/'
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onLikeClick={handleCardLike}
            onDeleteClick={handleConfirm}
          />
        </Switch>

        {loggedIn && <Footer/>}
        <InfoTooltip
          name={'tooltip'}
          isRegistered={isRegistered}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
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
};

export default App;