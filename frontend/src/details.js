import React from "react";
import placeholder from './images/placeholder.png'
import { Link } from "react-router-dom";
  
const Details = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Topbar">
          <Link to="/">
            <div className="logo">KanScratch</div>
          </Link>
          <Link to="/about">
            <div className="btn navigation">About</div>
          </Link>
          <Link to="/signup">
            <div className="btn navigation">Sign up</div>
          </Link>
          <Link to="/login">
            <div className="btn navigation">Log in</div>
          </Link>
          <Link to="/profile">
            <div className="btn navigation">Profile</div>
          </Link>
          <a href="https://scratch.mit.edu/" target="_blank">
            <div className="btn navigation">Scratch Website</div>
          </a>
        </div>
        <h1 className="title">Assignment Details</h1>
        <div className="Container">
            <img id="assignment" src={placeholder}/>
            <p>These are the details</p>
        </div>
      </header>
    </div>
  );
};
  
export default Details;