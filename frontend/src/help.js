import React from "react";
import { Link } from "react-router-dom";
import Tbar from "./components/topbar.js"

/**
 * Contains information describing the workflow of KanScratch for students (and soon also instructors).
 * @function
 */
const About = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Tbar/>
        <h1 className="title">KanScratch for Students:</h1>
        <h3>Welcome to KanScratch! Here we'll help you get started rocking your projects!</h3>
        <ol style={{margin: "2vh auto auto 4vw"}}>
          <li>Navigate to the main student page by pressing the KanScratch logo above in the navigation bar.</li>
          <li>Click the "Join" button in the header of the <i>Classrooms</i> container to join your classrooms.</li>
          <li>Type in the classroom code (ask your instructor for this code) in the box that pops up.</li>
          <li>Click the "Join" button to join your classroom <strong>[FUTURE FEATURE: THIS IS NOT IMPLEMENTED YET]</strong>.</li>
          <li>Press the "Close" button to navigate back to the main page.</li>
          <ul><li>You should now be able to see your classroom that you added show in the "Classrooms" container! <strong>[FUTURE FEATURE: THIS IS NOT IMPLEMENTED YET]</strong></li></ul>
          <li>Click on the classroom to see its details <strong>[FUTURE FEATURE: THIS IS NOT IMPLEMENTED YET]</strong>.</li>
          <li>Over in the "Projects" container you can see projects you can complete to learn Scratch and earn badges! <strong>[FUTURE FEATURE: THIS IS NOT IMPLEMENTED YET]</strong></li>
          <li>Click on a project (they match the color of the corresponding classroom in the classroom container) to see its tasks and complete it! <strong>[FUTURE FEATURE: THIS IS NOT IMPLEMENTED YET]</strong></li>
          <li><b>Have fun!</b></li>
        </ol>
        <h1 className="title">KanScratch for Instructors:</h1>
        <h3>Coming Soon! <strong>[FUTURE FEATURE: THIS IS NOT IMPLEMENTED YET]</strong></h3>
      </header>
    </div>
  );
};
  
export default About;