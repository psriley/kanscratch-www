import React, {useState, useEffect} from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Link } from "react-router-dom";
import Tbar from "./components/topbar";
import axios from 'axios';
import moment from 'moment';
import './login.css'


/**
 * SignUp form that creates a user with the inputted username and password information.
 * @function
 */
function SignUp() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [database, setDatabase] = useState(null);

    const errors = {
      uname: "Invalid username",
      pass: "Invalid password"
    };

    const handleSubmit = (event) => {
        // prevent page reload
        event.preventDefault();

        var { uname, pass, select } = document.forms[0];
        setIsSubmitted(true);
        // Create user with post api request
        addUser(uname.value, pass.value, select.value);
    };

    const addUser = (username, password, user_type) => {
        axios.post('http://localhost:8000/api/users', {
            "username": username,
            "type": user_type,
            "is_active": true,
            "is_superuser": false,
            "password": password,
            "password_hash": password,
            "created_on": moment().format(),//moment().format("DD-MM-YYYY hh:mm:ss"),
            "updated_on": moment().format(),
        }).then((response) => {
            setDatabase(response.data);
        });
    }

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
          <div className="error">{errorMessages.message}</div>
        );


    const options = [
      { value: 'student', label: 'Student' },
      { value: 'teacher', label: 'Teacher' }
    ];

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" name="uname" autoComplete="off" required />
                    {/*{renderErrorMessage("uname")}*/}
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" name="pass" required />
                    {/*{renderErrorMessage("pass")}*/}
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input type="text" name="email" autoComplete="off" required />
                    {/*<p className="help-text">Help Text</p>*/}
                    {/*{renderErrorMessage("email")}*/}
                </div>
                <div className="input-container">
                    <label>Are you a student or a teacher?</label>
                    <Select name="select" options={options} />
                    {/*{renderErrorMessage("email")}*/}
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
                    <div className="title-grey">Sign Up</div>
                    {/* if the isSubmitted is truthy, a form is rendered that says that they successfully signed up*/}
                    {isSubmitted ? <div>User successfully signed up</div> : renderForm}
                </div>
            </div>
        </div>
    )
}

export default SignUp;