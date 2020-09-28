import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/authOptions';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <Link to="/" className="navbar-brand">Omflow</Link>
        <div className="collpase navbar-expand-sm">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/schedule" className="nav-link">Schedule</Link>
            </li>
            <li className="navbar-item">
              <Link to="/map" className="nav-link">Map</Link>
            </li>
            <li className="navbar-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
          </ul>
        </div>
        <AuthOptions />
      </nav>
    );
  }
}
