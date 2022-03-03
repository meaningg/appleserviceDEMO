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
            onClick={() => createUserWithEmailAndPassword(email, password)}
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (category === 0) {
    return (
      <PriceIphone>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPhone 11 Pro Max
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Тип ремонта iPhone 11 Pro MAX Цена Осмотр и диагностика телефона -
              <b>бесплатно</b> <hr /> Диагностика с применением
              аппаратно-программного комплекса бесплатно Профилактика -
              <b>1500 руб.</b> <hr /> Наклейка защитного стекла 3D, MOCOLL. -
              <b>1500 руб.</b> <hr /> Замена сенсорного экрана дисплея -
              <b>18 900руб.</b>
              <hr /> Замена дисплейного модуля (сенсорный экран и дисплей
              Retina) - <b>26 900 руб.</b> <hr /> Замена рамки дисплея -
              <b>5 500 руб.</b> <hr /> Замена аккумуляторной батареи -{" "}
              <b>7 999 руб.</b> <hr /> Замена корпуса по запросу Замена
              защитного стекла камеры - <b>3 990 руб.</b> <hr /> Замена
              стеклянной вставки корпуса - <b>10 999 руб.</b> <hr />{" "}
              Восстановление системной платы после попадания жидкости от -{" "}
              <b>1 000 руб.</b> <hr /> Замена/ремонт динамика полифонии 8 999
              руб. <hr />
              Замена/ремонт динамика слухового (спикер) - <b>8 999 руб.</b>{" "}
              <hr /> Замена/ремонт микрофона - <b>8 999 руб.</b> <hr />
              Замена/ремонт шлейфа слухового динамика и датчика освещенности -{" "}
              <b>8 999 руб.</b> <hr /> Замена/ремонт шлейфа кнопки включения
              (верхний шлейф) - <b>8 999 руб.</b> <hr /> Замена/ремонт шлейфа
              кнопок громкости, выключателя режима тишины - <b>8 999 руб.</b>{" "}
              <hr /> Замена/ремонт разъёма наушников - <b>8 999 руб.</b> <hr />{" "}
              Замена/ремонт шлейфа зарядки и синхронизации - <b>8 999 руб.</b>{" "}
              <hr /> Замена/ремонт камеры - <b>10 999 руб.</b> <hr />
              Замена/ремонт антенного кабеля - <b>8 999 руб.</b> <hr />{" "}
              Замена/ремонт вибро-звонка - <b>8 999 руб.</b> <hr /> Обновление
              или восстановление прошивки - <b>1500 руб.</b> <hr /> Исправление
              нарушений геометрии корпуса - <b>1000 руб.</b> <hr /> Ремонт
              системной платы (компонентный) от - <b>1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPhone 11 Pro
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Тип ремонта iPhone 11 Pro
              <hr />
              Осмотр и диагностика телефона - <b>бесплатно</b>
              <hr />
              Диагностика с применением аппаратно-программного комплекса -{" "}
              <b>бесплатно</b>
              <hr />
              Профилактика - <b>1500 руб. </b>
              <hr />
              Наклейка защитного стекла 3D. MOCOLL. - <b>1500 руб.</b>
              <hr />
              Замена сенсорного экрана дисплея - <b>14 900 руб.</b>
              <hr />
              Замена дисплейного модуля (сенсорный экран и дисплей Retina) -{" "}
              <b>28 500 руб.</b>
              <hr />
              Замена рамки дисплея - <b>4 500 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b>5 999 руб.</b>
              <hr />
              Замена корпуса - <b>по запросу</b>
              <hr />
              Замена защитного стекла камеры - <b>2 990 руб.</b>
              <hr />
              Замена стеклянной вставки корпуса- <b>8 999 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b>от 1 000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт динамика слухового (спикер) - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт микрофона - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа слухового динамика и датчика освещенности -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопок громкости, выключателя режима тишины -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт разъёма наушников - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт камеры - <b>8 999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт вибро-звонка - <b>7 999 руб.</b>
              <hr />
              Обновление или восстановление прошивки - <b>1500 руб.</b>
              <hr />
              Исправление нарушений геометрии корпуса - <b>от 1000 руб.</b>
              <hr />
              Ремонт системной платы (компонентный) - <b>от 1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPhone 11
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Тип ремонта iPhone 11
              <hr />
              Осмотр и диагностика телефона - <b>бесплатно</b>
              <hr />
              Диагностика с применением аппаратно-программного комплекса -{" "}
              <b>бесплатно</b>
              <hr />
              Профилактика - <b>1500 руб. </b>
              <hr />
              Наклейка защитного стекла 3D. MOCOLL. - <b>1500 руб.</b>
              <hr />
              Замена сенсорного экрана дисплея - <b>14 900 руб.</b>
              <hr />
              Замена дисплейного модуля (сенсорный экран и дисплей Retina) -{" "}
              <b>28 500 руб.</b>
              <hr />
              Замена рамки дисплея - <b>4 500 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b>5 999 руб.</b>
              <hr />
              Замена корпуса - <b>по запросу</b>
              <hr />
              Замена защитного стекла камеры - <b>2 990 руб.</b>
              <hr />
              Замена стеклянной вставки корпуса- <b>8 999 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b>от 1 000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт динамика слухового (спикер) - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт микрофона - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа слухового динамика и датчика освещенности -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопок громкости, выключателя режима тишины -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт разъёма наушников - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт камеры - <b>8 999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт вибро-звонка - <b>7 999 руб.</b>
              <hr />
              Обновление или восстановление прошивки - <b>1500 руб.</b>
              <hr />
              Исправление нарушений геометрии корпуса - <b>от 1000 руб.</b>
              <hr />
              Ремонт системной платы (компонентный) - <b>от 1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPhone XS
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Тип ремонта iPhone XS
              <hr />
              Осмотр и диагностика телефона - <b>бесплатно</b>
              <hr />
              Диагностика с применением аппаратно-программного комплекса -{" "}
              <b>бесплатно</b>
              <hr />
              Профилактика - <b>1500 руб. </b>
              <hr />
              Наклейка защитного стекла 3D. MOCOLL. - <b>1500 руб.</b>
              <hr />
              Замена сенсорного экрана дисплея - <b>14 900 руб.</b>
              <hr />
              Замена дисплейного модуля (сенсорный экран и дисплей Retina) -{" "}
              <b>28 500 руб.</b>
              <hr />
              Замена рамки дисплея - <b>4 500 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b>5 999 руб.</b>
              <hr />
              Замена корпуса - <b>по запросу</b>
              <hr />
              Замена защитного стекла камеры - <b>2 990 руб.</b>
              <hr />
              Замена стеклянной вставки корпуса- <b>8 999 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b>от 1 000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт динамика слухового (спикер) - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт микрофона - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа слухового динамика и датчика освещенности -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопок громкости, выключателя режима тишины -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт разъёма наушников - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт камеры - <b>8 999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт вибро-звонка - <b>7 999 руб.</b>
              <hr />
              Обновление или восстановление прошивки - <b>1500 руб.</b>
              <hr />
              Исправление нарушений геометрии корпуса - <b>от 1000 руб.</b>
              <hr />
              Ремонт системной платы (компонентный) - <b>от 1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPhone XR
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Тип ремонта iPhone XR
              <hr />
              Осмотр и диагностика телефона - <b>бесплатно</b>
              <hr />
              Диагностика с применением аппаратно-программного комплекса -{" "}
              <b>бесплатно</b>
              <hr />
              Профилактика - <b>1500 руб. </b>
              <hr />
              Наклейка защитного стекла 3D. MOCOLL. - <b>1500 руб.</b>
              <hr />
              Замена сенсорного экрана дисплея - <b>14 900 руб.</b>
              <hr />
              Замена дисплейного модуля (сенсорный экран и дисплей Retina) -{" "}
              <b>28 500 руб.</b>
              <hr />
              Замена рамки дисплея - <b>4 500 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b>5 999 руб.</b>
              <hr />
              Замена корпуса - <b>по запросу</b>
              <hr />
              Замена защитного стекла камеры - <b>2 990 руб.</b>
              <hr />
              Замена стеклянной вставки корпуса- <b>8 999 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b>от 1 000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт динамика слухового (спикер) - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт микрофона - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа слухового динамика и датчика освещенности -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопок громкости, выключателя режима тишины -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт разъёма наушников - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт камеры - <b>8 999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт вибро-звонка - <b>7 999 руб.</b>
              <hr />
              Обновление или восстановление прошивки - <b>1500 руб.</b>
              <hr />
              Исправление нарушений геометрии корпуса - <b>от 1000 руб.</b>
              <hr />
              Ремонт системной платы (компонентный) - <b>от 1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPhone X
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Тип ремонта iPhone X
              <hr />
              Осмотр и диагностика телефона - <b>бесплатно</b>
              <hr />
              Диагностика с применением аппаратно-программного комплекса -{" "}
              <b>бесплатно</b>
              <hr />
              Профилактика - <b>1500 руб. </b>
              <hr />
              Наклейка защитного стекла 3D. MOCOLL. - <b>1500 руб.</b>
              <hr />
              Замена сенсорного экрана дисплея - <b>14 900 руб.</b>
              <hr />
              Замена дисплейного модуля (сенсорный экран и дисплей Retina) -{" "}
              <b>28 500 руб.</b>
              <hr />
              Замена рамки дисплея - <b>4 500 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b>5 999 руб.</b>
              <hr />
              Замена корпуса - <b>по запросу</b>
              <hr />
              Замена защитного стекла камеры - <b>2 990 руб.</b>
              <hr />
              Замена стеклянной вставки корпуса- <b>8 999 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b>от 1 000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт динамика слухового (спикер) - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт микрофона - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа слухового динамика и датчика освещенности -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопок громкости, выключателя режима тишины -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт разъёма наушников - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт камеры - <b>8 999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт вибро-звонка - <b>7 999 руб.</b>
              <hr />
              Обновление или восстановление прошивки - <b>1500 руб.</b>
              <hr />
              Исправление нарушений геометрии корпуса - <b>от 1000 руб.</b>
              <hr />
              Ремонт системной платы (компонентный) - <b>от 1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7bh-content"
            id="panel7bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPhone 8 Plus
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Тип ремонта iPhone 8 Plus
              <hr />
              Осмотр и диагностика телефона - <b>бесплатно</b>
              <hr />
              Диагностика с применением аппаратно-программного комплекса -{" "}
              <b>бесплатно</b>
              <hr />
              Профилактика - <b>1500 руб. </b>
              <hr />
              Наклейка защитного стекла 3D. MOCOLL. - <b>1500 руб.</b>
              <hr />
              Замена сенсорного экрана дисплея - <b>14 900 руб.</b>
              <hr />
              Замена дисплейного модуля (сенсорный экран и дисплей Retina) -{" "}
              <b>28 500 руб.</b>
              <hr />
              Замена рамки дисплея - <b>4 500 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b>5 999 руб.</b>
              <hr />
              Замена корпуса - <b>по запросу</b>
              <hr />
              Замена защитного стекла камеры - <b>2 990 руб.</b>
              <hr />
              Замена стеклянной вставки корпуса- <b>8 999 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b>от 1 000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт динамика слухового (спикер) - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт микрофона - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа слухового динамика и датчика освещенности -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопок громкости, выключателя режима тишины -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт разъёма наушников - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт камеры - <b>8 999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт вибро-звонка - <b>7 999 руб.</b>
              <hr />
              Обновление или восстановление прошивки - <b>1500 руб.</b>
              <hr />
              Исправление нарушений геометрии корпуса - <b>от 1000 руб.</b>
              <hr />
              Ремонт системной платы (компонентный) - <b>от 1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8bh-content"
            id="panel8bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPhone 8
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Тип ремонта iPhone 8
              <hr />
              Осмотр и диагностика телефона - <b>бесплатно</b>
              <hr />
              Диагностика с применением аппаратно-программного комплекса -{" "}
              <b>бесплатно</b>
              <hr />
              Профилактика - <b>1500 руб. </b>
              <hr />
              Наклейка защитного стекла 3D. MOCOLL. - <b>1500 руб.</b>
              <hr />
              Замена сенсорного экрана дисплея - <b>14 900 руб.</b>
              <hr />
              Замена дисплейного модуля (сенсорный экран и дисплей Retina) -{" "}
              <b>28 500 руб.</b>
              <hr />
              Замена рамки дисплея - <b>4 500 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b>5 999 руб.</b>
              <hr />
              Замена корпуса - <b>по запросу</b>
              <hr />
              Замена защитного стекла камеры - <b>2 990 руб.</b>
              <hr />
              Замена стеклянной вставки корпуса- <b>8 999 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b>от 1 000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт динамика слухового (спикер) - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт микрофона - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа слухового динамика и датчика освещенности -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопок громкости, выключателя режима тишины -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт разъёма наушников - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт камеры - <b>8 999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт вибро-звонка - <b>7 999 руб.</b>
              <hr />
              Обновление или восстановление прошивки - <b>1500 руб.</b>
              <hr />
              Исправление нарушений геометрии корпуса - <b>от 1000 руб.</b>
              <hr />
              Ремонт системной платы (компонентный) - <b>от 1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel9"}
          onChange={handleChange("panel9")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel9bh-content"
            id="panel9bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPhone 7 Plus
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Тип ремонта iPhone 7 Plus
              <hr />
              Осмотр и диагностика телефона - <b>бесплатно</b>
              <hr />
              Диагностика с применением аппаратно-программного комплекса -{" "}
              <b>бесплатно</b>
              <hr />
              Профилактика - <b>1500 руб. </b>
              <hr />
              Наклейка защитного стекла 3D. MOCOLL. - <b>1500 руб.</b>
              <hr />
              Замена сенсорного экрана дисплея - <b>14 900 руб.</b>
              <hr />
              Замена дисплейного модуля (сенсорный экран и дисплей Retina) -{" "}
              <b>28 500 руб.</b>
              <hr />
              Замена рамки дисплея - <b>4 500 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b>5 999 руб.</b>
              <hr />
              Замена корпуса - <b>по запросу</b>
              <hr />
              Замена защитного стекла камеры - <b>2 990 руб.</b>
              <hr />
              Замена стеклянной вставки корпуса- <b>8 999 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b>от 1 000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт динамика слухового (спикер) - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт микрофона - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа слухового динамика и датчика освещенности -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопок громкости, выключателя режима тишины -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт разъёма наушников - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт камеры - <b>8 999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт вибро-звонка - <b>7 999 руб.</b>
              <hr />
              Обновление или восстановление прошивки - <b>1500 руб.</b>
              <hr />
              Исправление нарушений геометрии корпуса - <b>от 1000 руб.</b>
              <hr />
              Ремонт системной платы (компонентный) - <b>от 1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel10"}
          onChange={handleChange("panel10")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel10bh-content"
            id="panel10bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPhone 7
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Тип ремонта iPhone 7
              <hr />
              Осмотр и диагностика телефона - <b>бесплатно</b>
              <hr />
              Диагностика с применением аппаратно-программного комплекса -{" "}
              <b>бесплатно</b>
              <hr />
              Профилактика - <b>1500 руб. </b>
              <hr />
              Наклейка защитного стекла 3D. MOCOLL. - <b>1500 руб.</b>
              <hr />
              Замена сенсорного экрана дисплея - <b>14 900 руб.</b>
              <hr />
              Замена дисплейного модуля (сенсорный экран и дисплей Retina) -{" "}
              <b>28 500 руб.</b>
              <hr />
              Замена рамки дисплея - <b>4 500 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b>5 999 руб.</b>
              <hr />
              Замена корпуса - <b>по запросу</b>
              <hr />
              Замена защитного стекла камеры - <b>2 990 руб.</b>
              <hr />
              Замена стеклянной вставки корпуса- <b>8 999 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b>от 1 000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт динамика слухового (спикер) - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт микрофона - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа слухового динамика и датчика освещенности -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопок громкости, выключателя режима тишины -{" "}
              <b>7 999 руб.</b>
              <hr />
              Замена/ремонт разъёма наушников - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт камеры - <b>8 999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b>7 999 руб.</b>
              <hr />
              Замена/ремонт вибро-звонка - <b>7 999 руб.</b>
              <hr />
              Обновление или восстановление прошивки - <b>1500 руб.</b>
              <hr />
              Исправление нарушений геометрии корпуса - <b>от 1000 руб.</b>
              <hr />
              Ремонт системной платы (компонентный) - <b>от 1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </PriceIphone>
    );
  }
  if (category === 1) {
    return (
      <PriceMacBook>
        {" "}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              MacBook Air 2013-15
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Диагностика - <b>Бесплатно</b>
              <hr />
              Замена матрицы - <b>8500 руб.</b>
              <hr />
              Замена дисплейного модуля - <b>27000 руб.</b>
              <hr />
              Замена клавиатуры - <b>7500 руб.</b>
              <hr />
              Замена петель поворотного механизма топкейса (2шт) -{" "}
              <b>6500 руб.</b>
              <hr />
              Замена топкейса - <b>15700 руб.</b>
              <hr />
              Замена разъёма питания (MagSafe) - <b>4900 руб.</b>
              <hr />
              Замена нижней части корпуса - <b>5500 руб.</b>
              <hr />
              Замена вентилятора системы охлаждения - <b>2200 руб</b>
              <hr />
              Замена тачпада - <b>4900 руб.</b>
              <hr />
              Замена аккумулятора - <b>5500 руб.</b>
              <hr />
              Замена жесткого диска или SSD (без стоимости запчасти) -{" "}
              <b>800 руб</b>
              <hr />
              Установка MacOs - <b>1500 руб</b>
              <hr />
              Компонентный ремонт системной платы - <b>от 2000 руб</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              MacBook Air 2010-12{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Диагностика - <b>Бесплатно</b>
              <hr />
              Замена матрицы - <b>8500 руб.</b>
              <hr />
              Замена дисплейного модуля - <b>27000 руб.</b>
              <hr />
              Замена клавиатуры - <b>7500 руб.</b>
              <hr />
              Замена петель поворотного механизма топкейса (2шт) -{" "}
              <b>6500 руб.</b>
              <hr />
              Замена топкейса - <b>15700 руб.</b>
              <hr />
              Замена разъёма питания (MagSafe) - <b>4900 руб.</b>
              <hr />
              Замена нижней части корпуса - <b>5500 руб.</b>
              <hr />
              Замена вентилятора системы охлаждения - <b>2200 руб</b>
              <hr />
              Замена тачпада - <b>4900 руб.</b>
              <hr />
              Замена аккумулятора - <b>5500 руб.</b>
              <hr />
              Замена жесткого диска или SSD (без стоимости запчасти) -{" "}
              <b>800 руб</b>
              <hr />
              Установка MacOs - <b>1500 руб</b>
              <hr />
              Компонентный ремонт системной платы - <b>от 2000 руб</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              MacBook Air 2008-09
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Диагностика - <b>Бесплатно</b>
              <hr />
              Замена матрицы - <b>8500 руб.</b>
              <hr />
              Замена дисплейного модуля - <b>27000 руб.</b>
              <hr />
              Замена клавиатуры - <b>7500 руб.</b>
              <hr />
              Замена петель поворотного механизма топкейса (2шт) -{" "}
              <b>6500 руб.</b>
              <hr />
              Замена топкейса - <b>15700 руб.</b>
              <hr />
              Замена разъёма питания (MagSafe) - <b>4900 руб.</b>
              <hr />
              Замена нижней части корпуса - <b>5500 руб.</b>
              <hr />
              Замена вентилятора системы охлаждения - <b>2200 руб</b>
              <hr />
              Замена тачпада - <b>4900 руб.</b>
              <hr />
              Замена аккумулятора - <b>5500 руб.</b>
              <hr />
              Замена жесткого диска или SSD (без стоимости запчасти) -{" "}
              <b>800 руб</b>
              <hr />
              Установка MacOs - <b>1500 руб</b>
              <hr />
              Компонентный ремонт системной платы - <b>от 2000 руб</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              MacBook Pro Retina
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Диагностика - <b>Бесплатно</b>
              <hr />
              Замена матрицы - <b>8500 руб.</b>
              <hr />
              Замена дисплейного модуля - <b>27000 руб.</b>
              <hr />
              Замена клавиатуры - <b>7500 руб.</b>
              <hr />
              Замена петель поворотного механизма топкейса (2шт) -{" "}
              <b>6500 руб.</b>
              <hr />
              Замена топкейса - <b>15700 руб.</b>
              <hr />
              Замена разъёма питания (MagSafe) - <b>4900 руб.</b>
              <hr />
              Замена нижней части корпуса - <b>5500 руб.</b>
              <hr />
              Замена вентилятора системы охлаждения - <b>2200 руб</b>
              <hr />
              Замена тачпада - <b>4900 руб.</b>
              <hr />
              Замена аккумулятора - <b>5500 руб.</b>
              <hr />
              Замена жесткого диска или SSD (без стоимости запчасти) -{" "}
              <b>800 руб</b>
              <hr />
              Установка MacOs - <b>1500 руб</b>
              <hr />
              Компонентный ремонт системной платы - <b>от 2000 руб</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              MacBook Pro
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Диагностика - <b>Бесплатно</b>
              <hr />
              Замена матрицы - <b>8500 руб.</b>
              <hr />
              Замена дисплейного модуля - <b>27000 руб.</b>
              <hr />
              Замена клавиатуры - <b>7500 руб.</b>
              <hr />
              Замена петель поворотного механизма топкейса (2шт) -{" "}
              <b>6500 руб.</b>
              <hr />
              Замена топкейса - <b>15700 руб.</b>
              <hr />
              Замена разъёма питания (MagSafe) - <b>4900 руб.</b>
              <hr />
              Замена нижней части корпуса - <b>5500 руб.</b>
              <hr />
              Замена вентилятора системы охлаждения - <b>2200 руб</b>
              <hr />
              Замена тачпада - <b>4900 руб.</b>
              <hr />
              Замена аккумулятора - <b>5500 руб.</b>
              <hr />
              Замена жесткого диска или SSD (без стоимости запчасти) -{" "}
              <b>800 руб</b>
              <hr />
              Установка MacOs - <b>1500 руб</b>
              <hr />
              Компонентный ремонт системной платы - <b>от 2000 руб</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </PriceMacBook>
    );
  }
  if (category === 2) {
    return (
      <PriceIpad>
        {" "}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPad 2017
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Осмотр - <b> Бесплатно</b>
              <hr />
              Диагностика - <b> Бесплатно</b>
              <hr />
              Замена сенсорного стекла (тачскрина) - <b> 3900 руб.</b>
              <hr />
              Замена дисплея (LCD) - <b> 6900 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b> 4500 руб.</b>
              <hr />
              Замена корпуса - <b> 6900 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b> от 2000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт разъема наушников (верхний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации (нижний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки Home - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт кнопок громкости, выключателя режима тишины -{" "}
              <b> 2900 руб.</b>
              <hr />
              Извлечение застрявшей сим карты (без разборки/с разборкой) -{" "}
              <b> 499/2999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт антены Wi-Fi - <b> 2900 руб.</b>
              <hr />
              Обновление и восстановление прошивки - <b> 1500 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPad Pro 9,7
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Осмотр - <b> Бесплатно</b>
              <hr />
              Диагностика - <b> Бесплатно</b>
              <hr />
              Замена сенсорного стекла (тачскрина) - <b> 3900 руб.</b>
              <hr />
              Замена дисплея (LCD) - <b> 6900 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b> 4500 руб.</b>
              <hr />
              Замена корпуса - <b> 6900 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b> от 2000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт разъема наушников (верхний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации (нижний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки Home - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт кнопок громкости, выключателя режима тишины -{" "}
              <b> 2900 руб.</b>
              <hr />
              Извлечение застрявшей сим карты (без разборки/с разборкой) -{" "}
              <b> 499/2999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт антены Wi-Fi - <b> 2900 руб.</b>
              <hr />
              Обновление и восстановление прошивки - <b> 1500 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPad Air 2
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Осмотр - <b> Бесплатно</b>
              <hr />
              Диагностика - <b> Бесплатно</b>
              <hr />
              Замена сенсорного стекла (тачскрина) - <b> 3900 руб.</b>
              <hr />
              Замена дисплея (LCD) - <b> 6900 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b> 4500 руб.</b>
              <hr />
              Замена корпуса - <b> 6900 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b> от 2000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт разъема наушников (верхний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации (нижний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки Home - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт кнопок громкости, выключателя режима тишины -{" "}
              <b> 2900 руб.</b>
              <hr />
              Извлечение застрявшей сим карты (без разборки/с разборкой) -{" "}
              <b> 499/2999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт антены Wi-Fi - <b> 2900 руб.</b>
              <hr />
              Обновление и восстановление прошивки - <b> 1500 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPad Air
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Осмотр - <b> Бесплатно</b>
              <hr />
              Диагностика - <b> Бесплатно</b>
              <hr />
              Замена сенсорного стекла (тачскрина) - <b> 3900 руб.</b>
              <hr />
              Замена дисплея (LCD) - <b> 6900 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b> 4500 руб.</b>
              <hr />
              Замена корпуса - <b> 6900 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b> от 2000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт разъема наушников (верхний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации (нижний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки Home - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт кнопок громкости, выключателя режима тишины -{" "}
              <b> 2900 руб.</b>
              <hr />
              Извлечение застрявшей сим карты (без разборки/с разборкой) -{" "}
              <b> 499/2999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт антены Wi-Fi - <b> 2900 руб.</b>
              <hr />
              Обновление и восстановление прошивки - <b> 1500 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              iPad 3/4
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Осмотр - <b> Бесплатно</b>
              <hr />
              Диагностика - <b> Бесплатно</b>
              <hr />
              Замена сенсорного стекла (тачскрина) - <b> 3900 руб.</b>
              <hr />
              Замена дисплея (LCD) - <b> 6900 руб.</b>
              <hr />
              Замена аккумуляторной батареи - <b> 4500 руб.</b>
              <hr />
              Замена корпуса - <b> 6900 руб.</b>
              <hr />
              Восстановление системной платы после попадания жидкости -{" "}
              <b> от 2000 руб.</b>
              <hr />
              Замена/ремонт динамика полифонии - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения (верхний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт разъема наушников (верхний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа зарядки и синхронизации (нижний шлейф) -{" "}
              <b> 2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки Home - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт кнопок громкости, выключателя режима тишины -{" "}
              <b> 2900 руб.</b>
              <hr />
              Извлечение застрявшей сим карты (без разборки/с разборкой) -{" "}
              <b> 499/2999 руб.</b>
              <hr />
              Замена/ремонт антенного кабеля - <b> 2900 руб.</b>
              <hr />
              Замена/ремонт антены Wi-Fi - <b> 2900 руб.</b>
              <hr />
              Обновление и восстановление прошивки - <b> 1500 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </PriceIpad>
    );
  }
  if (category === 3) {
    return (
      <PriceWatch>
        {" "}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              All Series
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <hr />
              Диагностика - <b>бесплатно</b>
              <hr />
              Замена дисплея:
              <hr />
              <b>4900 руб. (series 1)</b>
              <hr />
              <b>5900 руб. (series 1, 42mm)</b>
              <hr />
              <b>9900 руб. (series 2, 38mm)</b>
              <hr />
              <b>11900 руб. (series 2, 42 mm)</b>
              <hr />
              <b>9 900 руб. (series 3, 38mm)</b>
              <hr />
              <b>11 900 руб. (series 3, 42mm)</b>
              <hr />
              <b>14 900 руб. (series 4, 40mm)</b>
              <hr />
              <b>14 900 руб. (series 4, 44mm)</b>
              <hr />
              <b>18 900 руб. (series 5, 40mm)</b>
              <hr />
              <b>20 900 руб. (series 5, 44mm)</b>
              <hr />
              Замена сенсора Force Touch - <b>от 4900 руб.</b>
              <hr />
              Замена аккумулятора - <b>2900 руб.</b>
              <hr />
              Замена корпуса - <b>от 9900 руб.</b>
              <hr />
              Замена/ремонт кнопки Digital Crown - <b>2900 руб.</b>
              <hr />
              Замена/ремонт шлейфа кнопки включения - <b>2900 руб.</b>
              <hr />
              Замена ремонт Bluetooth - <b>5900 руб.</b>
              <hr />
              Замена микрофона - <b>2900 руб.</b>
              <hr />
              Замена динамика - <b>2900 руб.</b>
              <hr />
              Замена вибромотора Taptic Engine - <b>4900 руб</b>
              <hr />
              Обновление и восстановление прошивки - <b>1500 руб.</b>
              <hr />
              Ремонт системной платы - <b>от 1000 руб.</b>
              <hr />
              Восстановление после попадания жидкости - <b>от 1000 руб.</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </PriceWatch>
    );
  }
}

// Возврат компонентов с контентом
function PriceIphone(props) {
  return <>{props.children}</>;
}
function PriceIpad(props) {
  return <>{props.children}</>;
}
function PriceMacBook(props) {
  return <>{props.children}</>;
}
function PriceWatch(props) {
  return <>{props.children}</>;
}

export default App;
