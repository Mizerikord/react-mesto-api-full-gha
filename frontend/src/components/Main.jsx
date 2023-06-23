import React from 'react';
import Card from "./Card"
import { CurrentUserContext } from "../context/CurrentUserContext"

function Main(props) {

    const cards = props.cards;
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__avatar-container">
                        <img src={currentUser.avatar} alt="Ваш аватар" className="profile__avatar" />
                        <button className="profile__avatar-editor" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__name-container">
                        <div className="profile__autor-editor">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" className="profile__editor blackout" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__insert blackout" aria-label="Добавить место" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards" aria-label="Карточки мест">
                <ul className="cards__list">
                    {cards.map((elem) => (
                        <Card
                            card={elem}
                            onCardClick={props.onCardClick}
                            key={elem._id}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;