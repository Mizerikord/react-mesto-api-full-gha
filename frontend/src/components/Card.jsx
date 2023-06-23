import React from 'react';
import { CurrentUserContext } from "../context/CurrentUserContext"

function Card(props) {
    
    const card = props.card;
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(card)
    }

    function handleDeleteClick() {
        props.onCardDelete(card)
    }

    function handleLikeClick() {
        props.onCardLike(card)
    }

    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked && 'card__like_active'}`
    );

    return (
        <li className="card" >
            {isOwn && <button type="button" className='card__delete blackout' aria-label="удалить карточку" onClick={handleDeleteClick} />}
            <img src={card.link} alt={card.name} className="card__img" onClick={handleClick} />
            <div className="card__name">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button type="button" className={cardLikeButtonClassName} aria-label="сохранить" onClick={handleLikeClick} />
                    <div className="card__counter-container">
                        <p className="card__like-counter">{card.likes.length}</p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Card;
