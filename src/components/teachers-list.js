import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Teacher = props => {


  const practices = props.teacher.practices.map(p => p.name)
  console.log(practices.join(', '))

  return (
    <tr>
      <td>{props.teacher.image}</td>
      <td>{props.teacher.name}</td>
      <td>{props.teacher.description}</td>
      <td>{props.teacher.address}</td>
      <td>{practices.join(', ')}</td>
      <td>
        <Link to={"/dashboard/teacher/edit/" + props.teacher._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTeacher(props.teacher._id) }}>delete</a>
      </td>
    </tr>
  )
}

export default class TeachersList extends Component {
  constructor(props) {
    super(props);

    this.deleteTeacher = this.deleteTeacher.bind(this)

    this.state = { teachers: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/teachers/')
      .then(response => {
        this.setState({ teachers: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTeacher(id) {
    axios.delete('http://localhost:5000/teachers/' + id)
      .then(response => { console.log(response.data) });

    // _id comes from MongoDB
    this.setState({
      teachers: this.state.teachers.filter(el => el._id !== id)
    })
  }

  teacherList() {
    return this.state.teachers.map(currentTeacher => {
      return <Teacher teacher={currentTeacher} deleteTeacher={this.deleteTeacher} key={currentTeacher._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Teachers</h3>
        <table className="table table-hover table-condensed">
          <thead className="thead-light">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>Classes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.teacherList()}
          </tbody>
        </table>
        <Link to="/dashboard/teacher/create" className="btn btn-secondary">Create Teacher</Link>
      </div>
    )
  }
}
