import React, { Component } from 'react';
import axios from 'axios';

export default class Teacher extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      address: '',
      // styles: [],
      // levels: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/teachers/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          address: response.data.address,
          // styles: response.data.styles,
          // levels: response.data.levels
        })
      })
      .catch(function (error) {
        console.log(error);
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

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const teacher = {
      name: this.state.name,
      description: this.state.description,
      address: this.state.address
    }
    axios.post('http://localhost:5000/teachers/edit/' + this.props.match.params.id, teacher)
      .then(res => console.log(res.data));

    window.location = '/dashboard/teachers';
  }

  render() {
    return (
      <div>
        <h3>My Data</h3>
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
          <div className="form-group">
            <input type="submit" value="Save" className="btn btn-secondary" />
          </div>
        </form>
      </div>
    )
  }
}
