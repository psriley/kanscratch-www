import React from "react";
import placeholder from './images/placeholder.png'
import Gui, {AppStateHOC} from "scratch-gui";
import Tbar from "./components/topbar";
  
const appTarget = document.getElementById("root");

Gui.setAppElement(appTarget);

const WrappedGui = AppStateHOC(Gui);

/**
 * Contains information describing the details of a specific project on a page called "Details".
 * @function
 */
function Details() {
    return (
        <div className="App">
            <header className="App-header">
                <Tbar/>
                <h1 className='title'>Project Details</h1>
            </header>
            <div id='content'>
                <div className="Container">
                    <img id="assignment" src={placeholder} alt={"Project"}/>
                    <WrappedGui/>
                </div>
            </div>
        </div>
  );
}
  
export default Details;
