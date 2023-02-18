import placeholder from './images/placeholder.png'
import './App.css';
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Tbar from "./components/topbar";
import UserList from "./components/user_list.js";
import Gui, {AppStateHOC} from "scratch-gui";
// wrap gui in AppStateHOC

const appTarget = document.getElementById("root");

Gui.setAppElement(appTarget);

const WrappedGui = AppStateHOC(Gui);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/hello')
      .then(res => res.json())
      .then(data => setData(data.data));
  })

  return (
    <div className="App">
      <header className="App-header">
        <div className="Content">
        <WrappedGui/>
          <div className="Container">
            <div className="Container">
                <div className="Classrooms">
                  Classrooms
                  <div style={{display: "flex", flexWrap: "wrap", flexDirection: "column", border: "2px solid red"}}>
                    Looks like you don't have any classrooms yet.
                  </div>
                </div>
                <div className="Assignments">
                  Assignments
                  <div style={{gap: "1vh", display: "flex", flexWrap: "wrap", flexDirection: "column", border: "2px solid red"}}>
                    <img src={placeholder}/>
                    <img src={placeholder}/>
                    <img src={placeholder}/>
                  </div>
                </div>
            </div>
            <div>
              <div className="AssignmentView">
                <div>
                  Details
                  <Link to="/details">
                    <img src={placeholder}/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
