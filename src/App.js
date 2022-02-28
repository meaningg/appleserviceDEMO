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

function App() {
  const [authWindow, setauthWindow] = useState(false);
  // Получение состояния авторизации
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [user, loading, error] = useAuthState(auth);

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
            <button>Главная</button>
          </div>
          <div className="btn">
            <button>Цены</button>
          </div>
          <div className="btn">
            <button>Контакты</button>
          </div>
          {/* <div className="btn">
            <button
              onClick={() => {
                setauthWindow(true);
              }}
            >
              Регистрация
            </button>
          </div> */}
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
      <div className="content">
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
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
