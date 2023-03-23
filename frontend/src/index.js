import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './about';
import SignUp from './signup';
import LogIn from './login';
import Profile from './profile';
import Details from './details';
import Help from  './help';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


/**
 * Renders the Routes and navigation bar (Tbar) on the DOM root element.
 */
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/help" element={<Help/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/project/:id" element={<Details/>} />
      {/*<Route path="/classroom/:id" element={<Details/>} />*/}
    </Routes>
  </Router>
  , document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
