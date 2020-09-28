import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavbarBackend extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collpase navbar-expand-lg">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/dashboard/practices" className="nav-link">Practices</Link>
            </li>
            <li className="navbar-item">
              <Link to="/dashboard/teachers" className="nav-link">Teachers</Link>
            </li>
            <li className="navbar-item">
              <Link to="/dashboard/teacher/5f6dcc718d69bb26aae71295" className="nav-link">My Data</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
