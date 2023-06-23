import logo from '../images/logo.svg';
import { Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <Routes>
            <Route path="/signup" element={
                <header className="header">
                    <img src={logo} alt="Место" className="header__logo" />
                    <div className="header__login">
                        <Link to="/signin" className="header__link blackout">Войти</Link>
                    </div>

                </header>
            }>

            </Route>
            <Route path="/" element={
                <header className="header">
                    <img src={logo} alt="Место" className="header__logo" />
                    <div className="header__login">
                        <p className='header__email'>{props.userEmail}</p>
                        <Link to="/signin" className="header__link blackout" onClick={props.onSignOut}>Выйти</Link>
                    </div>
                </header>
            }>

            </Route>
            <Route path="/signin" element={
                <header className="header">
                    <img src={logo} alt="Место" className="header__logo" />
                    <div className="header__login">
                        <Link to="/signup" className="header__link blackout">Регистрация</Link>
                    </div>

                </header>
            }>

            </Route>
        </Routes>

    );
}

export default Header;
