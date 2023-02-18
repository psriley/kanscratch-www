import React from "react";
import placeholder from './images/placeholder.png'
import { Link } from "react-router-dom";
import Gui, {AppStateHOC} from "scratch-gui";
  
const appTarget = document.getElementById("root");

Gui.setAppElement(appTarget);

const WrappedGui = AppStateHOC(Gui);

/**
 * Contains information describing the details of a specific project on a page called "Details".
 * @function
 */
const Details = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Assignment Details</h1>
        <div className="Container">
            <img id="assignment" src={placeholder}/>
            <WrappedGui/>
        </div>
      </header>
    </div>
  );
};
  
export default Details;