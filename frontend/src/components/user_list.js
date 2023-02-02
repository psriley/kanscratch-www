import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';

// export default class PersonList extends React.Component {
//     state = {
//       persons: []
//     }
  
//     componentDidMount() {
//       axios.get(`https://jsonplaceholder.typicode.com/users`)
//         .then(res => {
//           const persons = res.data;
//           this.setState({ persons });
//         })
//     }
  
//     render() {
//       return (
//         <ul>
//           {
//             this.state.persons
//               .map(person =>
//                 <li key={person.id}>{person.name}</li>
//               )
//           }
//         </ul>
//       )
//     }
//   }

function UserList() {
  //const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);
    //   // res => response.json();
    //   // data => setData(data.data);
    //   console.log(response.data);
    //   //users.concat(response.data);
    // }, []);

    // axios.get(`http://localhost:8000/api/users`)
    //   .then(res => {
    //     const users = res.data;
    //     this.setState({ users });
    //   })

    // useEffect(() => {
    //   fetch('http://localhost:8000/api/users')
    //     .then(res => {
    //       const users = res.formData;
    //       this.setState({ users });
    //     })
    // })
  
  return (
    // <ul>
    //   {
    //     this.users
    //       .map(user =>
    //         <li key={user.id}>{user.name}</li>
    //       )
    //   }
    // </ul>
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