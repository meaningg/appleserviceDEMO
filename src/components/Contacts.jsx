// Импортируем зависимости
import "../styles/main.scss";
import useScrollPosition from "../useScrollPosition";
import {
    getAuth,
    signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../config";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import AnchorLink from "react-anchor-link-smooth-scroll";
import {NavLink} from "react-router-dom";

function Contacts() {
    const [authWindow, setauthWindow] = useState(false);
    // Получение состояния авторизации
    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [logInWindow, setLogInWindow] = useState(false);
    const [password, setPassword] = useState("");
    const [createUserWithEmailAndPassword] =
        useCreateUserWithEmailAndPassword(auth);
    const [user, loading, error] = useAuthState(auth);
    const [category, setCategory] = useState(0);

    const logout = () => {
        signOut(auth);
    };

    const scrollPosition = useScrollPosition();
    console.log(scrollPosition);
    return (
        <div className="app noselect">
            <div
                className={authWindow === true ? "authWindow" : "authWindow disabled"}
            >
                <div className="modal">
                    <div className="title">Регистрация</div>
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={() =>
                            createUserWithEmailAndPassword(email, password).then(() => {
                                setauthWindow(false);
                            })
                        }
                    >
                        Зарегестрироваться
                    </button>
                    <button
                        onClick={() => {
                            setauthWindow(false);
                        }}
                    >
                        Отмена
                    </button>
                </div>
            </div>
            <div
                className={logInWindow === true ? "authWindow" : "authWindow disabled"}
            >
                <div className="modal">
                    <div className="title">Авторизация</div>
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={() =>
                            createUserWithEmailAndPassword(email, password).then(() => {
                                setLogInWindow(false);
                            })
                        }
                    >
                        Войти
                    </button>
                    <button
                        onClick={() => {
                            setLogInWindow(false);
                        }}
                    >
                        Отмена
                    </button>
                </div>
            </div>
            <div className={scrollPosition >= 200 ? "header active" : "header"}>
                <div className="logo">iRemont55</div>
                <div className="buttons">
                    <div className="btn">
                        <button>
                            <NavLink to="/">Главная</NavLink>
                        </button>
                    </div>
                    <div className="btn">
                        <button>
                            <NavLink to="/contacts">Контакты</NavLink>
                        </button>
                    </div>
                    <div className="btn">
                        <button>
                            <NavLink to="/about">О нас</NavLink>
                        </button>
                    </div>
                    {user ? (
                        <>
                            <div className="btn">
                                <button onClick={logout}>{user.email}</button>
                            </div>
                            <div className="btn">
                                <button>
                                    <NavLink to="/sales">Акции</NavLink>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="btn">
                                <button
                                    onClick={() => {
                                        setauthWindow(true);
                                    }}
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                            <div className="btn">
                                <button
                                    onClick={() => {
                                        setLogInWindow(true);
                                    }}
                                >
                                    Войти
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div id="main" className="content">


                <div id="contacts" className="contacts__mapInfo">
                    <h1>Произвести ремонт вы можете</h1>
                    приехав по указанному ниже адресу или позвонить
                    <br /> <br />
                    <p>
                        г.Омск, ул. Масленникова, 60 <br /><a href="tel:+79045848686">+7 (904) 584-86-86 </a> <br />{" "}
                        ежедневно с 10:00 до 21:00
                    </p>
                </div>
                <div className="content__contacts">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A3f90a5a00954893f6c74047a21f073617942a7dba6923c391616ebc05cbe9709&amp;source=constructor"
                        width="100%" height="500" frameBorder="0"></iframe>
                </div>

                <div className="footer">
                    ©2022 iRemont55. Сервисный центр Apple техники в Омске. Все права
                    защищены.
                </div>
            </div>
        </div>
    );
}

export default Contacts;
