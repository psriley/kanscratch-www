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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const credentials = localStorage.getItem("login_credentials");
    if (credentials) {
      axios.get('http://localhost:8000/api/classes', {params: {username: credentials}})
        .then(res => {
            const classes = res.data;
            setClasses(classes);
        })
        .catch(error => {
          console.log(error.response.data.error);
        })
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/projects')
      .then(res => {
          const projects = res.data;
          setProjects(projects);
      })
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
              <input className='classCode' type='text'/>
            </div>
            <div className='buttonDiv'>
              <button className='codeButton'>Join</button>
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
            <ItemBox text={'project'} list={projects} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
