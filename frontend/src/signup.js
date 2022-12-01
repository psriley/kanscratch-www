import React, {useState, useEffect} from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Link } from "react-router-dom";
import Tbar from "./components/topbar";

// const SignUp = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <Tbar/>
//         <h1 className="title">Sign up</h1>
//         <div className="inputBox">
//           <div className="labelText">Username:</div>
//           <div><input type="text"></input></div>
//         </div>
//         <div className="inputBox">
//           <div className="labelText">Password:</div>
//           <div><input type="password"></input></div>
//         </div>
//         <div><button>Sign In</button></div>
//       </header>
//     </div>
//   );
// };

import './login.css'

function SignUp() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Login info for users
    const database = [
        // useEffect(() => {
        //   fetch('api/users')
        //      .then((response) => response.json())
        //      .then((data) => {
        //         console.log(data);
        //      })
        //      .catch((err) => {
        //         console.log(err.message);
        //      });
        //    }, []),
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
                    <input type="text" name="uname" autocomplete="off" required />
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
                <div className="login-form">
                    <div className="title">Sign Up</div>
                    {isSubmitted ? <div>User successfully signed up</div> : renderForm}
                </div>
            </header>
        </div>
    )
}

export default SignUp;