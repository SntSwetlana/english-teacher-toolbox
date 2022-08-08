import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {Authcontext} from "../context/Authcontext";
import Logo from "../img/circle-books-and-a-hat-small.png";
import '../css/login.css'
import { social } from '../data/data';


export const LoginPage = () => {
    const auth = useContext(Authcontext)
    const message = useMessage()
    const {loading, request,error,clearError} = useHttp()
    const [form, setForm] = useState({email:'', password:''})


    useEffect(()=>{
        message(error)
        clearError()
    }, [error,message, clearError])

    // useEffect(()=> {
    //     window.M.updateTextFields()
    // }, [])

    const changeHandler = event => {
        console.log('registration')
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try{
            console.log('we are still authorizing');
            console.log(form.email);
            console.log(form.password);
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log(data.token);
            console.log(data.userId);
            auth.login(data.token, data.userId)
        } catch (e) {}
    }
    console.log('registration enter')
    return(
                <div className='header__back'>
                    <div className='header'>
                        <div className="header__logo">
                            <img src={Logo} alt=""/>
                            <a href="/" ></a>
                        </div>
                    </div>
                    <div  className="formAuth__container">
                        <div className="formAuth__block">
                            <ul className="formAuth__list">
                                <li className="formAuth__item"><a href="/" className="formAuth__link">Login</a></li>
                                <li className="formAuth__item"><a href="/" className="formAuth__link">Registration</a>
                                </li>
                            </ul>
                        </div>
                        <p className="formAuth_line">Enter your login and password to proceed:</p>
                        <div className="formAuth__inputs">
                            <label  className="formAuth__labels" htmlFor="email">E-mail</label>
                            <input
                                className="formAuth__input"
                                placeholder="Enter e-mail"
                                id="email"
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}/>
                            <label  className="formAuth__labels" htmlFor="password">Password</label>
                            <input
                                className="formAuth__input"
                                placeholder="Enter password"
                                id="password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={changeHandler}/>
                            <div >
                                <ul className='formAuth_social'>
                                    {social.map((link) => {
                                        const { id, url, icon } = link;
                                        return (
                                            <li key={id} formAuth_social_link>
                                                <a href={url}>{icon}</a>
                                            </li>
                                        );
                                    })}
                                </ul>

                            </div>
                        <button
                            className='formAUth__button'
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                        login
                        </button>
                        <button
                            className='formAUth__button'
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Registration
                        </button>
                        </div>
                    </div>
                </div>
    )

}
