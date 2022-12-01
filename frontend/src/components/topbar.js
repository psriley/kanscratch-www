import React from "react";
import { Link } from "react-router-dom";

function Tbar(props){
    return(
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
    );
}

export default Tbar
