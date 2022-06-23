import React from "react";
import MainPage from "./components/MainPage"
import Contacts from "./components/Contacts"
import About from "./components/About"
import Sales from "./components/Sales"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<MainPage/>} />
            <Route exact path="/contacts" element={<Contacts/>} />
            <Route exact path="/about" element={<About/>}/>
              <Route exact path="/sales" element={<Sales/>} />
          </Routes>
        </Router>
      </div>
  )
}

export default App