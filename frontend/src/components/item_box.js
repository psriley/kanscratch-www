import React from "react";
import axios from "axios";

/**
 * Functional component that contains the boxes containing lists
 * of items (projects, classrooms, etc.)
 * @function
 * @property text = Whether the item box should contain classrooms or projects.
 */
export default class ItemList extends React.Component {
  state = {
    classes: [],
    projects: []
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/classes')
      .then(res => {
        if (this.props.text === 'Classroom') {
            const classes = res.data;
            this.setState({classes});
        }
      })
  }

  render() {
    return (
        <div className='ClassroomBox'>
            <div className="classrooms">
                <ul>
                    {
                        this.state.classes.map((c, i) => (
                        <a className="ItemButton green" key={i} href={`classrooms/${i}/`}>
                            <li title={c.name}>
                                { c.name }
                            </li>
                        </a>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
  }
}
