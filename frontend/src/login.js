import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Tbar from "./components/topbar.js"
import axios from 'axios';

import "./login.css";

function LogIn() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    //const [database, setDatabase] = useState(null);
    const [resp, setResponse] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/users').then((response) => {
    //       setDatabase(response.data);
    //     });
    //   }, []);
    
    

    // Login info for users
    // const database = [
    //     {
    //         username: "user1",
    //         password: "password"
    //     },
    //     {
    //         username: "user2",
    //         password: "password2"
    //     },
    // ];

    // function validateLogin() {
    //     if (resp !== undefined) {
    //         if (resp === "Successful!") {
    //             setIsSubmitted(true);
    //         } else if (resp === "Wrong password!") {
    //             setErrorMessages({ name: "pass", message: errors.pass });
    //         } else {
    //             setErrorMessages( { name: "uname", message: errors.uname });
    //         }
    //     } else {
    //         // Nothing was entered
    //         console.log("Nothing has been entered");
    //     }
    // }

    // function postLogin() {
    //     const post = { username: username, password: password };
        

    //     // axios.post('http://localhost:8000/api/login', {
    //     //     "username": username,
    //     //     "password": password
    //     // }).then((response) => {
    //     //     setResponse(response.data);
    //     // });
    // }

    const errors = {
      uname: "Invalid username",
      pass: "Invalid password"
    };

    const handleSubmit = (event) => {
        // prevent page reload
        event.preventDefault();

        //var { uname, pass } = document.forms[0];
        
        onPost();
        //validate();

        // postLogin();
        // validateLogin();

        // Find user login info
        //const userData = database.find((user) => user.name === uname.value);

        // useEffect(() => {
        //     postLogin();
        // }, [])
        // useEffect(() => {
        //     if (resp !== undefined) {
        //         if (resp === "Successful!") {
        //             setIsSubmitted(true);
        //         } else if (resp === "Wrong password!") {
        //             setErrorMessages({ name: "pass", message: errors.pass });
        //         } else {
        //             setErrorMessages( { name: "uname", message: errors.uname });
        //         }
        //     } else {
        //         // Nothing was entered
        //         console.log("Nothing has been entered");
        //     }
        // }, [])

        // const postLogin = async() => {
        //     const response = await axios('http://localhost:8000/api/login');
        //     setResponse(response.data);
        // }

        // if (userData !== undefined) {
        //     if (userData.password_hash !== pass.value) {
        //         // Invalid password
        //         setErrorMessages({ name: "pass", message: errors.pass });
        //     } else {
        //         setIsSubmitted(true);
        //     }
        // } else {
        //     // Username not found
        //     setErrorMessages( { name: "uname", message: errors.uname });
        // }
    };

    const onPost = async (e) => {
        const post = { username: username, password: password };
        try {
            const response = await axios.post('http://localhost:8000/api/login', post);
            //setResponse(response.data);
            if (response.data !== undefined) {
                if (response.data === "Successful!") {
                    setIsSubmitted(true);
                } else if (response.data === "Wrong password!") {
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

    // const validate = async (e) => {
    //     if (resp !== undefined) {
    //         if (resp === "Successful!") {
    //             setIsSubmitted(true);
    //         } else if (resp === "Wrong password!") {
    //             setErrorMessages({ name: "pass", message: errors.pass });
    //         } else {
    //             setErrorMessages( { name: "uname", message: errors.uname });
    //         }
    //     } else {
    //         // Nothing was entered
    //         console.log("Nothing has been entered");
    //     }
    // }

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
                <div className="login-form">
                    <div className="title">Log In</div>
                    {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
                </div>
            </header>
        </div>
    )
}

export default LogIn;