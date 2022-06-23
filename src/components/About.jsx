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
import { NavLink } from "react-router-dom"
function About() {
    const [authWindow, setauthWindow] = useState(false);
    // Получение состояния авторизации
    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logInWindow, setLogInWindow] = useState(false);
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

                <div className="about">
                    <div className="title">
                        О нас
                    </div>
                    <div className="infoWrapper">
                        <div className="img"><img src="https://static.tildacdn.com/tild6439-6464-4139-a534-616637353965/programma-dla-servis.jpg" alt=""/></div>
                        <div className="text">Основные направления работы нашей компании: ремонт и восстановление
                            техники Apple, выполнене работ по установке групногабартиной техники,
                            например, телевизоры. Заявки на ремонт принимаются круглосуточно. Мы
                            работаем без выходных и праздников. <br/><br/>

                            Мы предоставляем длительную гарантию (до 2-х лет) на наши услуги и
                            установленные запчасти. После завершения работы вы получаете бланк
                            строгой отчетности, на основании которого можете обратиться к нам, в
                            случае возникновения гарантийного случая. Все сервисные инженеры с
                            высшим образованием и имеют опыт работы более 7 лет.<br/><br/>

                            Мы делаем все возможное для облегчения жизни наших клиентов. Вы
                            можете рассчитывать на срочный выезд мастера на дом и бесплатную
                            диагностику. </div>
                    </div>
                </div>
                <div className="footer">
                    ©2022 iRemont55. Сервисный центр Apple техники в Омске. Все права
                    защищены.
                </div>
            </div>
        </div>
    );
}


export default About;
