import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Practice = props => (
  <tr>
    <td>{props.practice.name}</td>
    <td>{props.practice.description}</td>
    <td>{props.practice.teacher.name}</td>
    <td>{props.practice.duration}</td>
    <td>{props.practice.date.substring(0, 10)}</td>
    <td>
      <Link to={"/dashboard/practice/edit/" + props.practice._id}>edit</Link> | <a href="#" onClick={() => { props.deletePractice(props.practice._id) }}>delete</a>
    </td>
  </tr>
)

export default class PracticesList extends Component {
  constructor(props) {
    super(props);

    this.deletePractice = this.deletePractice.bind(this)

    this.state = {
      practices: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/practices/')
      .then(response => {
        this.setState({ practices: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePractice(id) {
    axios.delete('http://localhost:5000/practices/' + id)
      .then(response => { console.log(response.data) });
    this.setState({
      practices: this.state.practices.filter(el => el._id !== id) // _id comes from MongoDB
    })
  }

  practicesList() {
    return this.state.practices.map(currentpractice => {
      return <Practice
        practice={currentpractice}
        deletePractice={this.deletePractice}
        key={currentpractice._id}
      />;
    })
  }

  render() {
    return (
      <div>
        <h3>Practices</h3>
        <table className="table table-hover table-condensed">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Teacher</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.practicesList()}
          </tbody>
        </table>
        <Link to="/dashboard/practice/create" className="btn btn-secondary">Create Class</Link>
      </div>
    )
  }
}
