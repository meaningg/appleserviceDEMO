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
function Sales() {
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
                        Акции
                    </div>
                    <div className="infoWrapper">

                        <div className="textSales">Только для зарегистрированных пользователей: <br/><br/>

                            Скидка 10% при первом обращении
                            На нашем сайте вы можете уточнить стоимость типовых работ для разных моделей смартфонов, планшетов, ноутбуков производства Apple Inc. Это поможет произвести примерный расчет цены обслуживания, если вы знаете, в чем заключается поломка. Точную стоимость озвучивает мастер сервисного центра после проведения комплексной диагностики. Если вы оставите заявку на ремонт с помощью специальной онлайн-формы, сможете получить скидку в размере 10% от утвержденного прайса.
<br/><br/>
                            Скидка 10% за оценку нашей работы
                            По окончании ремонта поделитесь своим мнением о сервисном центре Apple. Отзыв можно разместить в справочниках на Google, Яндекс, Фламп. После модерации сообщения пришлите нашим менеджерам ссылку на размещенный пост. Разницу в цене, равную 10% от стоимости произведенного ремонта, мы переведем на счет вашего мобильного телефона.
<br/><br/>
                            Скидка 10% при обслуживании двух устройств
                            Если кроме смартфона в ремонте нуждается ноутбук или планшет, сэкономьте свое время и деньги, сразу передав технику мастерам нашего сервисного центра. Откладывать обслуживание невыгодно и даже опасно для гаджета. Под воздействием внешних факторов детали, длительное время находящиеся в нерабочем состоянии, могут окисляться, что приведет к необратимым поломкам.
<br/><br/>
                            Скидка 15% при повторном обращении
                            Наш сервисный центр всегда рад постоянным клиентам и ценит оказанное доверие. Ярким подтверждением этому является приятный денежный бонус в виде скидки 15%. Чтобы его получить, сообщите мастерам сервисного центра о том, что уже обслуживались раньше. Если мы найдем ваши контакты в общей базе выполненных заказов, снизим стоимость</div>
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


export default Sales;
