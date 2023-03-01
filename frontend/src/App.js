import placeholder from './images/placeholder.png'
import './App.css';
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Tbar from "./components/topbar";
import ItemBox from "./components/item_box";
import Modal from './components/modal';

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
      <div id='body'>
        <Modal show={showModal} handleClose={handleCloseModal}> 
          <p>Modal content goes here.</p>
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
