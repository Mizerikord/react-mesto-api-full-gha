import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { useEffect, useState } from 'react';
import api from '../utils/Api.js'
import { CurrentUserContext } from "../context/CurrentUserContext"
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setProfile] = useState(false);
  const [isAddPlacePopupOpen, setPlace] = useState(false);
  const [isEditAvatarPopupOpen, setAvatar] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltip] = useState(false);

  const [selectedCard, setCardClick] = useState({ name: '', link: '' });
  const [currentUser, setcurrentUser] = useState({ name: "", about: "", avatar: "" });
  const [cards, setCards] = useState([]);

  const [loggedIn, setloggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState([]);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);

  const navigate = useNavigate();

  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return
    }
    api.getUserAuthData(jwt)
      .then((data) => {
        if (data) {
          setIsTokenVerified(true);
          setloggedIn(true);
          setUserEmail(data.email);
        } else {
          setloggedIn(false);
          localStorage.removeItem('jwt');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //Редирект при изменении статуса пользователя
  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
    return;
  }, [loggedIn]);

  //Запуск проверки токена при изменении статуса пользователя
  useEffect(() => {
    handleCheckToken();
  }, [loggedIn])

  //Получение данных пользователя
  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    api.getUserData()
      .then(res => {
        setcurrentUser(res)
      })
      .catch((res) => {
        console.log(res);
      })
  }, [loggedIn]);

  //Получение карточек
  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    api.getInitialCards()
      .then((cards) => { setCards(cards) })
      .catch((res) => {
        console.log(res)
      })
  }, [loggedIn]);

  //Изменение данных юзера
  function handleUpdateUser({ name, about }) {
    api.patchProfile({ name, about })
      .then((res) => {
        setcurrentUser(res);
        closeAllPopups()
      })
      .catch(res => console.log(res.status))
  }

  //Открытие попапов
  const handleAddPlaceClick = () => {
    setPlace(true);
  }

  const handleEditAvatarClick = () => {
    setAvatar(true);
  }

  const handleEditProfileClick = () => {
    setProfile(true);
  }

  const handleInfoTooltip = () => {
    setInfoTooltip(true);
  }

  //Изменение аватара
  function handleUpdateAvatar(avatar) {
    api.patchAvatarUser(avatar)
      .then((res) => {
        setcurrentUser(res);
        closeAllPopups()
      })
      .catch(res => console.log(res.status))
  }

  //Развернуть карточку
  function handleCardClick(card) {
    setCardClick(card);
  }

  //Добавление карточки
  function handleAddPlaceSubmit({ name, link }) {
    api.postNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(res => console.log(res.status))
  }

  //Закрытие попапов
  const closeAllPopups = () => {
    setProfile(false);
    setPlace(false);
    setAvatar(false);
    setInfoTooltip(false);
    setCardClick({ name: '', link: '' });
  }

  //Реализация постановки-снятия лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(res => console.log(res.status))
  }

  //Удаление карточки
  function handleCardDelete(card) {
    api.deleteMyCard(card)
      .then((res) => {
        const newCard = cards.filter(elem => elem._id !== card._id);
        setCards(newCard);
      })
      .catch(res => console.log(res.status))
  }

  function handleUserAutorization(userData) {
    api.postUserAutorization(userData)
      .then((userData) => {
        if (userData) {
          api._setToken(userData.token);
          localStorage.setItem('jwt', userData.token);
          setloggedIn(true);
        } else {
          setloggedIn(true);
          setUserEmail(userData.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
        setloggedIn(false);
      })
  }

  function handleUserRegistration(userData) {
    api.postNewUser(userData)
      .then((userData) => {
        if (userData) {
          handleInfoTooltip(true);
          navigate('/signin');
          setSuccessRegister(true);
        } else {
          setloggedIn(false);
          handleInfoTooltip(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloggedIn(false);
        handleInfoTooltip(false);
      })
  }

  function handleSignOut() {
    setloggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/signin');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onSignOut={handleSignOut}
          userEmail={userEmail} />
        <Routes>
          <Route path="/signup" element={
            <Register
              onRegister={handleUserRegistration}
            />} />
          <Route path="/signin" element={
            <Login
              onLogin={handleUserAutorization} />} />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                component={Main}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
              />
            } />
          <Route path="*" element={loggedIn ? < Navigate to="/" /> : <Navigate to="/signin" replace />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={"popup_opened"} />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          successRegister={successRegister} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
