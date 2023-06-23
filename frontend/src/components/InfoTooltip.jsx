import registerTrue from '../images/success.svg'
import registerFalse from '../images/fail.svg'

function InfoTooltip(props) {

    return (
        <section className={`popup popup-login ${props.isOpen ? "popup_opened" : ""}`} aria-label="open image">
            <div className="popup__container">
                <button type="button" className="popup__disable blackout" aria-label="закрыть картинку" onClick={props.onClose}></button>
                <img src={props.successRegister ? registerTrue : registerFalse} alt="Развернутое изображение места" className="popup__login-img" />
                <p className="popup__login-text">{props.successRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
            </div>
        </section>
    )
}

export default InfoTooltip;