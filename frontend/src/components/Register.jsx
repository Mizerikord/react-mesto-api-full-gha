import React from 'react';
import { useState } from 'react';

function Register(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onRegister({
            email,
            password
        });
    }

    React.useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);

    return (
        <main className="main">
            <section className="login">
                <h2 className="login__header">Регистрация</h2>
                <form action="#" className="login__form" onSubmit={handleSubmit}>
                    <input type="email" name="email" id="email" placeholder="Email" className="form__autorization form-email" value={email} onChange={handleChangeEmail} />
                    <input type="password" name="password" id="password" placeholder="Пароль" className="form__autorization form-password" value={password} onChange={handleChangePassword} />
                    <input type="submit" value="Зарегистрироваться" className="form-submit-button" />
                    <span className="form__text">Уже зарегистрированы? <a href="/signin" className="form__link blackout">Войти</a></span>
                </form>
            </section>
        </main>
    )
}

export default Register;