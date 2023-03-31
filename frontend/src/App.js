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

  const handleJoinButtonClick = async () => {
    const fetchedClasses = await getAllClasses();
    joinClass(fetchedClasses);
  };

  async function getAllClasses() {
    return axios.get('http://localhost:8000/api/classes')
      .then(res => {
        return res.data;
      });
  }

  const joinClass = (fetchedClasses) => {
    const code = document.getElementById("code").value;
    const hashes = fetchedClasses.map((value) => {
      return { name: value.name, code: value.class_code_hash };
    });

    hashes.forEach((value) => {
      if (value.code === code) {
        console.log("Match!");
        axios.post('http://localhost:8000/api/join', {
          "classroom_name": value.name, // remember to change this key from "classroom_name" to "class_name"
          "student": credentials,
        }).then((response) => {
          console.log(`Successfully joined class: ${value.name}!`);
          window.location.reload();
        });
      } else {
        console.log("Nope...");
      }
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
              <button className='codeButton' onClick={handleJoinButtonClick}>Join</button>
            </div>
          </div>
        </Modal>
        <div>
          <div id='Header'>
            <span>Classrooms</span>
            <button name='join' onClick={handleShowModal}>Join</button>
          </div>
          <ItemBox text={'classroom'} list={classes} />
        </div>

        <div>
          <div id='Header'>
            <span>Projects</span>
          </div>
          <div className='ProjectList'>
            <ItemBox text={'project'} list={projects.map((project) => {return {name: project.name}})} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;