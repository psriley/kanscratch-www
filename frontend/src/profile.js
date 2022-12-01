import React from "react";
import { Link } from "react-router-dom";
import Tbar from "./components/topbar.js";
  
const Profile = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Tbar/>
        <h1 className="title">Profile</h1>
      </header>
    </div>
  );
};
  
export default Profile;