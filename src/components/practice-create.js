import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class Createpractice extends Component {
  constructor(props) {
    super(props);

    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      duration: 0,
      date: new Date(),
      teachers: [],
      teacherId: '',
      teacherName: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/teachers/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            teachers: response.data,
            teacherId: response.data[0]._id,
            teacherName: response.data[0].name
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeTeacher(e) {
    this.setState({
      teacherId: e.target.value,
      teacherName: e.target.options[e.target.selectedIndex].text
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const practice = {
      name: this.state.name,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      teacher: this.state.teacherId,
    }

    axios.post('http://localhost:5000/practices/create', practice)
      .then(res => console.log(res.data));

    window.location = '/dashboard/practices';
  }

  render() {
    return (
      <div>
        <h3>Create Class</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Teacher: </label>
            <select
              ref="teacherInput"
              required
              className="form-control"
              value={this.state.teacherId}
              onChange={this.onChangeTeacher}>
              {
                this.state.teachers.map(function (teacher) {
                  return <option
                    key={teacher._id}
                    value={teacher._id}
                  >{teacher.name}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Class" className="btn btn-primary" />
            <Link to='/dashboard/practices/' value="Cancel" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      </div>
    )
  }
}
