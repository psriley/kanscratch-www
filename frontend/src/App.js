import placeholder from './images/placeholder.png'
import './App.css';
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Tbar from "./components/topbar";
import PersonList from "./components/user_list";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/test/')
      .then(res => res.json())
      .then(data => setData(data.data));
  })

  return (
    <div className="App">
      <header className="App-header">
        <Tbar/>
        <div className="Content">
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
          <p></p>
          <p>Hello</p>
          <p><PersonList/></p>
        </div>
      </header>
    </div>
  );
}

export default App;
