import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';

/**
 * Functional component that gets the list of all users in the database.
 * @function
 */
// TODO: Add a parameter so this can filter by class.
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);
  
  return (
    <div>
      {users.map((user) => {
      return (
         <span key={user.id}>
            <h2>{user.name}</h2>
            <body>{user.user_type}</body>
         </span>
      );})}
    </div>
  );
}

export default UserList;