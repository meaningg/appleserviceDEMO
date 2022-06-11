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
                        </>
                    ) : (
                        <>
                            <div className="btn">
                                <button
                                    onClick={() => {
                                        setauthWindow(true);
                                    }}
                                >
                                    Регистрация
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
// Меню с выбором продуктов и сортировка
function Prices({ category }) {
    const [expanded, setExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (category === 0) {
        return <div className="priceContainer">
            <div onClick={() => {setIsOpen(!isOpen)}} className={isOpen ? "card" : "card_hidden"}>
                <div className="priceEl">
                    <div className="name">Замена дисплея</div>
                    <div className="price">1000₽</div>
                </div>
                <hr/>
                <div className="priceEl">
                    <div className="name">Замена корпуса</div>
                    <div className="price">2000₽</div>
                </div>
                <hr/>
                <div className="priceEl">
                    <div className="name">Замена/ремонт камеры</div>
                    <div className="price">3000₽</div>
                </div>
                <hr/>
                <div className="priceEl">
                    <div className="name">Замена аккумулятора</div>
                    <div className="price">4000₽</div>
                </div>
                <hr/>
                <div className="priceEl">
                    <div className="name">Замена/ремонт микрофона</div>
                    <div className="price">5000₽</div>
                </div>
                <hr/>
                <div className="priceEl">
                    <div className="name">Замена разговорного динамика</div>
                    <div className="price">6000₽</div>
                </div>
                <hr/>
                <div className="priceEl">
                    <div className="name">Замена/ремонт кнопки влючения</div>
                    <div className="price">7000₽</div>
                </div>
                <hr/>
                <div className="priceEl">
                    <div className="name">Замена/ремонт кнопки Home</div>
                    <div className="price">8000₽</div>
                </div>

            </div>
            <div className="priceRow">
                <div className="priceItem"><img src="https://apb.market/Content/Images/Products/e2/e1/e2e14578d5054d40aaa13fa2635973ae.png" alt=""/><button onClick={() => {
                    setIsOpen(!isOpen)
                }
                }>iPhone X</button></div>
                <div className="priceItem"><img src="https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-xr-yellow.png" alt=""/><button onClick={() => {
                    setIsOpen(!isOpen)
                }
                }>iPhone XR</button></div><div className="priceItem"><img src="https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-xs-gold.png" alt=""/><button onClick={() => {
                setIsOpen(!isOpen)
            }
            }>iPhone XS</button></div>
            </div>
            <div className="priceRow">
                <div className="priceItem"><img src="https://1click.ru/upload/resized/500/500/75/upload/iblock/0bf/x0bf53f8d75e4ae3b09e38d960c0de298.png,q1636995549.pagespeed.ic.C6kgmRz69k.png" alt=""/><button onClick={() => {
                    setIsOpen(!isOpen)
                }
                }>iPhone 11</button></div><div className="priceItem"><img src="src/components/MainPage" alt=""/><button onClick={() => {
                setIsOpen(!isOpen)
            }
            }>iPhone 12</button></div><div className="priceItem"><img src="https://istudio.ua/upload/iblock/307/iphone-13-midnight-512gb.png" alt=""/><button onClick={() => {
                setIsOpen(!isOpen)
            }
            }>iPhone 13</button></div>
            </div>

        </div>;
    }
    if (category === 1) {
        return (
            <div className="priceContainer">
                <div onClick={() => {setIsOpen(!isOpen)}} className={isOpen ? "card" : "card_hidden"}>
                    <div className="priceEl">
                        <div className="name">Замена дисплея</div>
                        <div className="price">1000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена корпуса</div>
                        <div className="price">2000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт камеры</div>
                        <div className="price">3000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена аккумулятора</div>
                        <div className="price">4000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт микрофона</div>
                        <div className="price">5000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена разговорного динамика</div>
                        <div className="price">6000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт кнопки влючения</div>
                        <div className="price">7000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт кнопки Home</div>
                        <div className="price">8000₽</div>
                    </div>

                </div>
                <div className="priceRow">
                    <div className="priceItem"><img src="https://pngimg.com/uploads/macbook/macbook_PNG51.png" alt=""/><button onClick={() => {
                        setIsOpen(!isOpen)
                    }
                    }>MacBook Air</button></div><div className="priceItem"><img src="https://pngimg.com/uploads/macbook/macbook_PNG51.png" alt=""/><button onClick={() => {
                    setIsOpen(!isOpen)
                }
                }>Macbook Pro</button></div>
                </div>
            </div>
        )
    }
    if (category === 2) {
        return (
            <div className="priceContainer">
                <div onClick={() => {setIsOpen(!isOpen)}} className={isOpen ? "card" : "card_hidden"}>

                    <div className="priceEl">
                        <div className="name">Замена дисплея</div>
                        <div className="price">1000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена корпуса</div>
                        <div className="price">2000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт камеры</div>
                        <div className="price">3000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена аккумулятора</div>
                        <div className="price">4000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт микрофона</div>
                        <div className="price">5000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена разговорного динамика</div>
                        <div className="price">6000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт кнопки влючения</div>
                        <div className="price">7000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт кнопки Home</div>
                        <div className="price">8000₽</div>
                    </div>

                </div>
                <div className="priceRow">
                    <div className="priceItem"><img src="https://s2.thingpic.com/images/gM/DjaVJiMZBjEKBoEchPAyWMFC.png" alt=""/><button onClick={() => {
                        setIsOpen(!isOpen)
                    }
                    }>iPad Air</button></div><div className="priceItem"><img src="https://static.wixstatic.com/media/b3d9e2_37e23667b3474b01b550f44873c24904~mv2.png/v1/fit/w_500,h_500,q_90/file.png" alt=""/><button onClick={() => {
                    setIsOpen(!isOpen)
                }
                }>iPad Pro</button></div>
                </div>
            </div>
        );
    }
    if (category === 3) {
        return (
            <div className="priceContainer">
                <div onClick={() => {setIsOpen(!isOpen)}} className={isOpen ? "card" : "card_hidden"}>
                    <div className="priceEl">
                        <div className="name">Замена дисплея</div>
                        <div className="price">1000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена корпуса</div>
                        <div className="price">2000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт камеры</div>
                        <div className="price">3000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена аккумулятора</div>
                        <div className="price">4000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт микрофона</div>
                        <div className="price">5000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена разговорного динамика</div>
                        <div className="price">6000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт кнопки влючения</div>
                        <div className="price">7000₽</div>
                    </div>
                    <hr/>
                    <div className="priceEl">
                        <div className="name">Замена/ремонт кнопки Home</div>
                        <div className="price">8000₽</div>
                    </div>

                </div>
                <div className="priceRow">
                    <div className="priceItem"><img src="https://revendo.ch/wp-content/uploads/watch-4-schwarz.png" alt=""/><button onClick={() => {
                        setIsOpen(!isOpen)
                    }
                    }>All Apple Watch</button></div>
                </div>
            </div>
        );
    }
}



export default About;
