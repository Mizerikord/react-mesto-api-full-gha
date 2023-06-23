function ImagePopup(props) {

    if (props.card.link && props.card.name ? props.card.link || props.card.name : "")

        return (
            <div className={`popup popup_cover ${props.isOpen}`} aria-label="open image">
                <div className="popup__cover">
                    <button type="button" className="popup__disable blackout" aria-label="закрыть картинку" onClick={props.onClose}></button>
                    <img src={props.card.link} alt={props.card.name} className="popup__cover-img" />
                    <p className="popup__text">{props.card.name}</p>
                </div>
            </div>
        );
}

export default ImagePopup;
