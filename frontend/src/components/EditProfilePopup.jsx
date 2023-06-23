import React from 'react';
import { CurrentUserContext } from "../context/CurrentUserContext"
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm title={"Редактировать профиль"} name={"profile"} onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
            <label className="form__box">
                <input id="name" className="form__elem form__elem_input_name" type="text"
                    placeholder="Ваше имя" name="name" minLength="2" maxLength="40" value={name} onChange={handleChangeName} required />
                <span className="name-error form__elem-error">Некорректно заполнено поле имени</span>
            </label>
            <label className="form__box">
                <input id="description" className="form__elem form__elem_input_name" type="text"
                    placeholder="Ваша деятельность" name="about" minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} required />
                <span className="name-error form__elem-error">Некорректно заполнено поле хобби</span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;