import React from "react";
import Tbar from "./components/topbar.js"
import axios from "axios";

import "./login.css";


/**
 * LogIn form that validates user's username and password information to log them in.
 * @function
 */
function LogIn() {
    const [errorMessages, setErrorMessages] = React.useState({});
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [resp, setResponse] = React.useState(null);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const errors = {
      uname: "Invalid username",
      pass: "Invalid password"
    };

    const handleSubmit = (event) => {
        // prevent page reload
        event.preventDefault();
        
        onPost();
    };

    const onPost = async (e) => {
        const post = { username: username, password_hash: password };
        try {
            const response = await axios.post('http://localhost:8000/api/login', post);
            //setResponse(response.data);
            if (response.data !== undefined) {
                if (response.data.message === "Successful!") {
                    const credentials = {username: response.data.user.username, type: response.data.user.type};
                    setIsSubmitted(true);
                    localStorage.setItem("login_credentials", JSON.stringify(credentials));
                } else if (response.data.message === "Wrong password!") {
                    setErrorMessages({ name: "pass", message: errors.pass });
                } else {
                    setErrorMessages( { name: "uname", message: errors.uname });
                }
            } else {
                // Nothing was entered
                console.log("Nothing has been entered");
            }
        } catch (e) {
            alert(e);
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
                    <input type="text" name="uname" autoComplete="off" onChange={e => setUsername(e.target.value)} required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" name="pass" onChange={e => setPassword(e.target.value)} required />
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
            </header>
            <div id="content">
                <div className="login-form">
                    <div className="title-grey">Log In</div>
                    {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
                </div>
            </div>
        </div>
    )
}

export default LogIn;