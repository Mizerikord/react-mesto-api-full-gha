import React from "react";

function PopupWithForm({ title, name, isOpen, children, onClose, onSubmit  }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__disable blackout" aria-label="закрыть окно" onClick={onClose} />
        <h2 className="popup__header" lang="ru">{title}</h2>
        <form action="#" className="form" name={name} onSubmit={onSubmit}>
          {children}
          <input type="submit" data-alter-text="Сохранение..." data-default="Сохранить" value="Сохранить"
            className="form__save-button" name="submit-button" />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

