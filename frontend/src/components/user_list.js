import React from 'react';
import axios from 'axios';

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

export default class UserList extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get(`https://localhost:8000/api/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
    // useEffect(() => {
    //   fetch('http://localhost:8000/api/users')
    //     .then(res => {
    //       const users = res.formData;
    //       this.setState({ users });
    //     })
    // })
  }

  render() {
    return (
      <ul>
        {
          this.state.users
            .map(user =>
              <li key={user.id}>{user.name}</li>
            )
        }
      </ul>
    )
  }
}