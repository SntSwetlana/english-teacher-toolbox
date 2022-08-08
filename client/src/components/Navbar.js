import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {Authcontext} from "../context/Authcontext";
import '../css/styles.css'
import Logo from '../img/circle-books-and-a-hat-small.png';
export const Navbar = () => {
    const  auth  = useContext(Authcontext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }
    return(
        <>
        <div className='header__back'>
            <div className='header'>
                <div className="header__logo">
                    <img src={Logo} alt=""/>
                    <a href="/" />
                </div>
                <div className="form">
                    <button className="form__button"></button>
                    <input className="form__input" type="search" placeholder="search"/>
                </div>
                <nav className="header__nav">
                    <ul className="header__list">
                        <li className="header__item"><NavLink to="/SchoolPage" className="header__link">SchoolPage</NavLink></li>
                        <li className="header__item"><NavLink to="/DictionaryPage" className="header__link">DictionaryPage</NavLink></li>
                        <li className="header__item"><NavLink to="/DictionaryLinksPage" className="header__link">DictionaryLinksPage</NavLink></li>
                        <li className="header__item"><NavLink to="/BookshelfPage" className="header__link">BookshelfPage</NavLink></li>
                        <li className="header__item"><NavLink to="/VideoLibraryPage" className="header__link">VideoLibraryPage</NavLink></li>
                        <li className="header__item"><NavLink to="/AboutPage" className="header__link">AboutPage</NavLink></li>
                        <li className="header__item"><NavLink to="/" onClick={logoutHandler} className="header__link_img">logout</NavLink></li>
                    </ul>
                    <div className="header__buttons">
                        <button className="header__search"></button>
                        <button className="header__menu"></button>
                    </div>
                </nav>
                <div className="header__buttons">
                    <button className="header__search"></button>
                    <button className="header__menu"></button>
                </div>
            </div>
        </div>
        </>
    )
}
