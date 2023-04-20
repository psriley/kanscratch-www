import './App.css';
import React, {useState, useEffect} from 'react';
import Tbar from "./components/topbar";
import ItemBox from "./components/item_box";
import Modal from './components/modal';
import axios from "axios";

/**
 * Functional component that contains the main view (right now just the main student view).
 * @function
 */
function App() {
  const [showModal, setShowModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [credentials, setCredentials] = useState(null);

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

    let source = axios.CancelToken.source();

    const fetchClasses = async () => {
      try {
        let response = await axios.get('http://localhost:8000/api/user_classes', { params: {username: credentials.username}, cancelToken: source.token });
        const classes = response.data;
        setClasses(classes);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    const fetchProjects = async () => {
      try {
        let response;
        if (credentials.type === 'Student') {
          response = await axios.get(`http://localhost:8000/api/student_projects/${credentials.username}`, { cancelToken: source.token });
        } else {
          response = await axios.get(`http://localhost:8000/api/instructor_projects/${credentials.username}`, { cancelToken: source.token });
        }
        const projects = response.data;
        setProjects(projects);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    fetchClasses();
    fetchProjects();

    return () => {
      source.cancel();
    };
  }, [credentials]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const joinClass = () => {
    const code = document.getElementById("code").value;

    axios.post('http://localhost:8000/api/join', {
      "classroom_code": code,
      "student": credentials.username,
    }).then((response) => {
      window.location.reload();
    });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <Tbar/>
      </header>
      <div id='content'>
        <Modal show={showModal} handleClose={handleCloseModal}>
          <div className='codeBox'>
            <div id='codeDiv'>
              <input id="code" className='classCode' type='text'/>
            </div>
            <div className='buttonDiv'>
              <button className='codeButton' onClick={joinClass}>Join</button>
            </div>
          </div>
        </Modal>
        <div>
          <div id='Header'>
            <span>Classrooms</span>
            <button name='join' onClick={handleShowModal}>Join</button>
          </div>
          <ItemBox text={'classroom'} list={classes.map((classroom) => {return {name: classroom.name}})} color={classes.map((classroom) => {return classroom.color.hex_code})} slug={classes.map((classroom) => {return {slug: classroom.slug}})} />
        </div>

        <div>
          <div id='Header'>
            <span>Projects</span>
          </div>
          <div className='ProjectList'>
            <ItemBox text={'project'} list={projects.map((project) => {return {name: project.name}})} slug={projects.map((project) => {return {slug: project.slug}})} />
          </div>
        </div>
      </div>
    </div>
  );
}

async function getAllClasses() {
  return axios.get('http://localhost:8000/api/classes')
    .then(res => {
      return res.data;
    });
}

//module.exports = {App, getAllClasses}
export default App

