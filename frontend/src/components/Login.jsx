import React from 'react';
import { useState } from 'react';

function Login(props) {

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
        props.onLogin({
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
                <h2 className="login__header">Вход</h2>
                <form action="#" className="login__form" onSubmit={handleSubmit}>
                    <input type="email" name="login-email" placeholder="Email" value={email} className="form__autorization form-email" onChange={handleChangeEmail}/>
                    <input type="password" name="login-password" placeholder="Пароль" value={password} className="form__autorization form-password" onChange={handleChangePassword}/>
                    <input type="submit" value="Войти" className="form-submit-button"  />
                </form>
            </section>
        </main>
    )
}

export default Login;