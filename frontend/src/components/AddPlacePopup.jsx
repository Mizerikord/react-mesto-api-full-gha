import React from 'react';
import PopupWithForm from './PopupWithForm'
import { useEffect, useState } from 'react';

function AddPlacePopup(props) {

    const [name, setName] = useState("");
    const [link, setLink] = useState("");


    function handleChangeTitle(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        e.preventDefault();
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({ name, link });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            title={"Добавить место"} name={"insert"}
            onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
            <label className="form__box">
                <input id="place" className="form__elem form__elem_input_name" type="text"
                    placeholder="Название" name="name" value ={name} minLength="2" maxLength="40" onChange={handleChangeTitle} required
                />
                <span className="name-error form__elem-error"></span>
            </label>
            <label className="form__box">
                <input id="place-url" className="form__elem form__elem_input_name" type="url"
                    placeholder="Ссылка на картинку" name="name" value ={link} onChange={handleChangeLink} required
                />
                <span className="name-error form__elem-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;