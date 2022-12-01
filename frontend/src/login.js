import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import Tbar from "./components/topbar.js"

import "./login.css";

function LogIn() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Login info for users
    const database = [
        {
            username: "user1",
            password: "password"
        },
        {
            username: "user2",
            password: "password2"
        },
    ];

    const errors = {
      uname: "Invalid username",
      pass: "Invalid password"
    };

    const handleSubmit = (event) => {
        // prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        debugger;
        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        if (userData !== undefined) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages( { name: "uname", message: errors.uname });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
          <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" name="uname" autoComplete="off" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input className="submit" type="submit" />
                </div>
            </form>
        </div>
      );

    return (
        <div className="App">
            <header className="App-header">
                <Tbar/>
                <div className="login-form">
                    <div className="title">Log In</div>
                    {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
                </div>
            </header>
        </div>
    )
}

export default LogIn;