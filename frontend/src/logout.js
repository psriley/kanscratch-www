import React, {useEffect} from 'react';
import Tbar from "./components/topbar";

/**
 * Shows a dialog box that says the user is now logged out, and removes the credentials from local storage.
 * @function
 */
function LogOut() {

    useEffect(() => {
        localStorage.removeItem("login_credentials");
    });

    return (
        <div className="App">
            <header className="App-header">
                <Tbar/>
            </header>
            <div id="content">
                <div className="login-form">
                    <div className="title-grey">Log Out</div>
                    <div>User is successfully logged out</div>
                </div>
            </div>
        </div>
  );
}

export default LogOut;
