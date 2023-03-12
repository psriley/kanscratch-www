import placeholder from './images/placeholder.png'
import './App.css';
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Tbar from "./components/topbar";
import ItemBox from "./components/item_box";
import Modal from './components/modal';

/**
 * Functional component that contains the main view (right now just the main student view).
 * @function
 */
function App() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
          <ItemBox text={'Classroom'}/>
        </div>

        <div>
          <div id='Header'>
            <span>Projects</span>
          </div>
          <div className='ProjectList'>
            <ItemBox text={'Project'}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
