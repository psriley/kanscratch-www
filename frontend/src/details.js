import React from "react";
import placeholder from './images/placeholder.png'
import { Link } from "react-router-dom";
  

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
            <p>These are the details</p>
        </div>
      </header>
    </div>
  );
};
  
export default Details;