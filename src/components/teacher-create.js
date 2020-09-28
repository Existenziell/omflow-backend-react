import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UploadImage from './uploadImage';

export default class CreateTeacher extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    // this.onImageUpload = this.onImageUpload.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      address: '',
      selectedFile: null
    }
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

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  // onImageUpload = (event) => {
  //   console.log(event.target.files[0]);
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //     loaded: 0,
  //   })
  //   // e.preventDefault();
  //   // this.refs.fileUploader.click();
  //   // const data = new FormData()
  //   // data.append('file', e.target.files[0])
  //   // data.append('name', 'some value user types')
  //   // data.append('description', 'some value user types')
  //   // axios.post('/files', data).then((response) => {
  //   //   console.log(response);
  //   // })
  // }

  onSubmit(e) {
    e.preventDefault();
    const teacher = {
      name: this.state.name,
      description: this.state.description,
      address: this.state.address
    }

    console.log(teacher);

    axios.post('http://localhost:5000/teachers/create', teacher)
      .then(res => console.log(res.data))
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      name: '',
      description: '',
      address: ''
    })

    window.location = '/dashboard/teachers';
  }

  render() {
    return (
      <div>
        <h3>Create Teacher</h3>
        <form onSubmit={this.onSubmit}>
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
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>

          {/* <UploadImage /> */}

          <div className="form-group">
            <input type="submit" value="Create Teacher" className="btn btn-primary" />
            <Link to='/dashboard/teachers/' value="Cancel" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      </div>
    )
  }
}
