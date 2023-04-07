import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

/**
 * Functional component that contains the routes for general navigation at the top of the site.
 * @function
 */
function Tbar(){
    const [credentials, setCredentials] = useState(null);
    const [username, setUsername] = useState("anonymous");

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("login_credentials"))) {
            setUsername(JSON.parse(localStorage.getItem("login_credentials")).username)
        }
    }, [credentials]);

    return(
        <div className="Topbar">
            <Link to="/">
                <div className="logo">KanScratch</div>
            </Link>
            
            <ul>
                <Link to="/help">
                    <li>
                        <div className="">Help</div>
                    </li>
                </Link>

                <Link to="/about">
                    <li>
                        <div className="btn navigation">About</div>
                    </li>
                </Link>

                <Link to="/signup">
                    <li>
                        <div className="btn navigation">Sign up</div>
                    </li>
                </Link>

                {!JSON.parse(localStorage.getItem("login_credentials")) ?
                <Link to="/login">
                    <li>
                        <div className="btn navigation">Log in</div>
                    </li>
                </Link>
                :
                <Link to="/logout">
                    <li>
                        <div className="btn navigation">Log out</div>
                    </li>
                </Link>
                }

                <a href="https://scratch.mit.edu/">
                    <li>
                        <div className="btn navigation">Scratch Website</div>
                    </li>
                </a>

                <div id="profile">
                    Hello, {username}
                </div>
            </ul>
        </div>
    );
}

export default Tbar
