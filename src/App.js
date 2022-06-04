// Импортируем зависимости

import "./styles/main.scss";
import useScrollPosition from "./useScrollPosition";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "./config";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnchorLink from "react-anchor-link-smooth-scroll";

function App() {
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
              <AnchorLink href="#main">Главная</AnchorLink>
            </button>
          </div>
          <div className="btn">
            <button>
              <AnchorLink href="#prices">Цены</AnchorLink>
            </button>
          </div>
          <div className="btn">
            <button>
              <AnchorLink href="#contacts">Контакты</AnchorLink>
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
        <div className="content__welcome"></div>
        <div className="content__imageFilter">
          <div className="message">
            <div className="title">
              Сервисный центр <br /> Apple в Омске
            </div>
            <div className="subText">Быстрый и качественный ремонт.</div>

            <div className="ticketInput">
              <input type="text" placeholder="Телефон" />
              <button>Заказать ремонт</button>
            </div>
          </div>
        </div>
        <div className="content__price noselect">
          <div
            onClick={() => {
              setCategory(0);
            }}
            className={category === 0 ? "categoryBtns active" : "categoryBtns"}
          >
            <img
              src="https://img.icons8.com/ios-filled/100/000000/iphone-x.png"
              alt=""
            />
          </div>
          <div
            onClick={() => {
              setCategory(1);
            }}
            className={category === 1 ? "categoryBtns active" : "categoryBtns"}
          >
            <img
              src="https://img.icons8.com/ios/100/000000/macbook.png"
              alt=""
            />
          </div>
          <div
            onClick={() => {
              setCategory(2);
            }}
            className={category === 2 ? "categoryBtns active" : "categoryBtns"}
          >
            <img src="https://img.icons8.com/ios/100/000000/ipad.png" alt="" />
          </div>
          <div
            onClick={() => {
              setCategory(3);
            }}
            className={category === 3 ? "categoryBtns active" : "categoryBtns"}
          >
            <img
              src="https://img.icons8.com/ios/100/000000/apple-watch.png"
              alt=""
            />
          </div>
        </div>
        <div id="prices" className="content__price_title">
          Цены на ремонт
        </div>
        <div className="content__pice_burger">
          <Prices category={category}></Prices>
        </div>
        <div className="content__banner">
          <div className="content__banner_filter">
            <div className="content__banner_text">
              <p>
                Бесплатный выезд на дом или в офис. <br /> Гарантия на все виды
                работ до 12 месяцев. <br /> Запас оригинальных комплектующих.
                <br />
                Сертифицированные мастера.
              </p>
            </div>
          </div>
        </div>
        <div id="contacts" className="contacts__mapInfo">
          <h1>Произвести ремонт вы можете</h1>
          приехав по указанному ниже адресу или позвонить
          <br /> <br />
          <p>
            г.Омск, ул. Масленникова, 60 <br /> +7 (904) 584-86-86 <br />{" "}
            ежедневно с 10:00 до 21:00
          </p>
        </div>
        <div className="content__contacts">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aed3558380bc3e254a1b4c7838c41563c190a48401f9cd0e6f1351f733901b724&amp;source=constructor"
            width="100%"
            height="500"
            frameborder="0"
          ></iframe>
        </div>
        <div className="reviews">
          <div className="title">Последние отзывы:</div>
          <div className="last">
            <div className="item">
              <div className="title">Андрей:</div>
              <div className="text">Вау!</div>
            </div>
            <div className="item">
              <div className="title">Андрей:</div>
              <div className="text">Ну просто лучший сервис в мире!</div>
            </div>
            <div className="item">
              <div className="title">Жора:</div>
              <div className="text">Каждый день хожу! Лучшее пиво в городе!</div>
            </div>
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
          <div className="price">1000$</div>
        </div>
        <hr/>
        <div className="priceEl">
          <div className="name">Замена дисплея</div>
          <div className="price">1000$</div>
        </div>
        <hr/>
        <div className="priceEl">
          <div className="name">Замена дисплея</div>
          <div className="price">1000$</div>
        </div>
        <hr/>
        <div className="priceEl">
          <div className="name">Замена дисплея</div>
          <div className="price">1000$</div>
        </div>
        <hr/>
        <div className="priceEl">
          <div className="name">Замена дисплея</div>
          <div className="price">1000$</div>
        </div>
        <hr/>
        <div className="priceEl">
          <div className="name">Замена дисплея</div>
          <div className="price">1000$</div>
        </div>
        <hr/>
        <div className="priceEl">
          <div className="name">Замена дисплея</div>
          <div className="price">1000$</div>
        </div>
        <hr/>
        <div className="priceEl">
          <div className="name">Замена дисплея</div>
          <div className="price">1000$</div>
        </div>

      </div>
      <div className="priceRow">
        <div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
          setIsOpen(!isOpen)
        }
        }>iPhone X</button></div>
        <div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
          setIsOpen(!isOpen)
        }
        }>iPhone X</button></div><div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
        setIsOpen(!isOpen)
      }
      }>iPhone X</button></div>
      </div>
      <div className="priceRow">
        <div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
          setIsOpen(!isOpen)
        }
        }>iPhone X</button></div><div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
        setIsOpen(!isOpen)
      }
      }>iPhone X</button></div><div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
        setIsOpen(!isOpen)
      }
      }>iPhone X</button></div>
      </div>

    </div>;
  }
  if (category === 1) {
    return (
        <div className="priceContainer">
          <div onClick={() => {setIsOpen(!isOpen)}} className={isOpen ? "card" : "card_hidden"}>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>

          </div>
          <div className="priceRow">
            <div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
              setIsOpen(!isOpen)
            }
            }>iPhone X</button></div><div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
            setIsOpen(!isOpen)
          }
          }>iPhone X</button></div>
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
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>

          </div>
          <div className="priceRow">
            <div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
              setIsOpen(!isOpen)
            }
            }>iPhone X</button></div><div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
            setIsOpen(!isOpen)
          }
          }>iPhone X</button></div>
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
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>
            <hr/>
            <div className="priceEl">
              <div className="name">Замена дисплея</div>
              <div className="price">1000$</div>
            </div>

          </div>
          <div className="priceRow">
            <div className="priceItem"><img src="https://cliparting.com/wp-content/uploads/2018/03/iphone-clipart-2018-4.png" alt=""/><button onClick={() => {
              setIsOpen(!isOpen)
            }
            }>iPhone X</button></div>
          </div>
        </div>
    );
  }
}



export default App;
