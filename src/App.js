import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import UserContext from "./context/userContext";

import Home from './components/pages/home';
import Dashboard from './components/pages/dashboard';
import Schedule from "./components/pages/schedule";
import Map from "./components/pages/map";

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {

      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/users/isTokenValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>

      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/schedule" component={Schedule} />

          <Route exact path="/map" render={props => <Map {...props} />} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
