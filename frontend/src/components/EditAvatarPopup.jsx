import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatarSrcValue = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarSrcValue.current.value
        })
    }

    return (
        <PopupWithForm
            title={"Редактировать аватар"} name={"avatar"}
            onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
            <label className="form__box">
                <input ref={avatarSrcValue} id="avatar" className="form__elem form__elem_input_name" type="url"
                    placeholder="Ссылка на аватар" name="name" required
                />
                <span className="name-error form__elem-error">Некорректно введены данные</span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;