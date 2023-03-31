import React, {useState, useEffect} from "react";
import placeholder from './images/placeholder.png'
import Gui, {AppStateHOC} from "scratch-gui";
import Tbar from "./components/topbar";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";

// const appTarget = document.getElementById("root");
//
// Gui.setAppElement(appTarget);
//
// const WrappedGui = AppStateHOC(Gui);

/**
 * Contains information describing the details of a specific project on a page called "Details".
 * @function
 */
function Details() {
    // TODO: useEffect details per project
    const [details, setDetails] = useState(null);
    const [credentials, setCredentials] = useState(null);

    const location = useLocation();
    const {slug} = location.state;

    useEffect(() => {
        const storedCredentials = JSON.parse(localStorage.getItem("login_credentials"));
            if (credentials) {
              if (storedCredentials && storedCredentials.username !== credentials.username) {
                setCredentials(storedCredentials);
              }
            } else {
              setCredentials(storedCredentials);
        }
    }, [credentials]);

    useEffect(() => {
        debugger;
        if (!credentials) {
          return;
        }

        const fetchProjectDetails = async () => {
          try {
            let response = await axios.get(`http://localhost:8000/api/projects/${slug[0].slug}`, { params: {username: credentials.username} });
            const details = response.data;
            debugger;
            setDetails(details.project.description);
          } catch (error) {
            console.log(error.response.data.error);
          }
        };

        fetchProjectDetails();

    }, [credentials, slug]);

    return (
        <div className="App">
            <header className="App-header">
                <Tbar/>
                {/*<h1 className='title'>Project Details</h1>*/}
            </header>
            <div id='content'>
                <div className="login-form">
                    <div className="title-grey" style={{textAlign: "center"}}>Project Details</div>
                    <div className="Container">
                        <div>
                            <img id="assignment" src={placeholder} alt={"Project"}/>
                            <div id="see-inside-button">
                                <a href="https://scratch.mit.edu/projects/733285515/editor/">
                                    <button>See Inside</button>
                                </a>
                            </div>
                        </div>
                        <div id="description">{details}</div>
                    </div>
                </div>
                {/*<WrappedGui/>*/}
            </div>
        </div>
  );
}
  

export default Details;
