import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import Tbar from "./components/topbar";
import placeholder from "./images/placeholder.png";
import Modal from "./components/modal";

/**
 * Contains information describing the details of a specific classroom on a page called "Classroom Details".
 * @function
 */
function ClassroomDetails() {
    // TODO: useEffect details per project
    const [showModal, setShowModal] = useState(false);
    const [details, setDetails] = useState([]);
    const [credentials, setCredentials] = useState(null);
    const [className, setClassName] = useState(null);

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
        if (!credentials) {
          return;
        }

        const fetchClassroomDetails = async () => {
          try {
            let response = await axios.get(`http://localhost:8000/api/classrooms/${slug[0].slug}`, { params: {username: credentials.username} });
            const details = response.data;
            setDetails(details);
            setClassName(Object.keys(details).map((key) => { return details[key].name }));
          } catch (error) {
            console.log(error.response.data.error);
          }
        };
        fetchClassroomDetails();

    }, [credentials, slug]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Tbar/>
                {/*<h1 className='title'>Project Details</h1>*/}
            </header>
            <div id='content'>
                <div className="login-form">
                    <div className="title-grey" style={{textAlign: "center"}}>{className}</div>
                    <div className="Container">
                      {Object.keys(details).map((key, index) => {
                        if (key === 'classroom') {
                            return (
                                <div id="class-code-button" key={index}>
                                    <Modal show={showModal} handleClose={handleCloseModal}>
                                        <div id="class-code" key={index}>{details[key].class_code_hash}</div>
                                    </Modal>
                                    <button onClick={handleShowModal}>Show Class Code</button>
                                </div>
                            );
                        } else if (key === 'users') {
                            return (
                                <div id="users" key={index}>
                                    <h2>Students<hr/></h2>
                                    {details[key].map((user, i) => (
                                        <div key={i}>{user.username}</div>
                                    ))}
                                </div>
                            );
                            // return <div key={index}>{details[key]}</div>;
                        } else {
                            return (
                                <div id="projects" key={index}>
                                    <h2>Projects<hr/></h2>
                                    {details[key].map((project, i) => (
                                        <div key={i}>{project.name}</div>
                                    ))}
                                </div>
                            );
                        }
                      })}
                    </div>
                </div>
                {/*<WrappedGui/>*/}
            </div>
        </div>
  );
}


export default ClassroomDetails;
