import React from "react";
import { Link } from "react-router-dom";
import Tbar from "./components/topbar.js"

/**
 * Contains information describing KanScratch on a page called "About".
 * @function
 */
const About = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Tbar/>
        <h1 className="title">About KanScratch</h1>
        <div>
          <p>
            KanScratch is an alternative to MIT's Scratch website that enables Scratch to be 
            used effectively in an academic environment. Specifically, this project aims to make 
            it easy for students and teachers to interact with each other in Scratch through new 
            assignment and classroom systems, as well as ensuring that the use of KanScratch will 
            not violate any academic laws or regulations, such as FERPA.
          </p>
        </div>
      </header>
    </div>
  );
};
  
export default About;