import React, { useContext, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";

import Header from '../layout/header';
import NavbarBackend from '../layout/navbar-backend';

import PracticesList from "../practices-list";
import CreatePractice from "../practice-create";
import EditPractice from "../practice-edit";
import Teacher from "../teacher";
import TeachersList from "../teachers-list";
import CreateTeacher from "../teacher-create";
import EditTeacher from "../teacher-edit";

const Dashboard = () => {
  const { userData } = useContext(UserContext);
  return (

    <div>

      <Header />
      {userData.user ? (
        <div>
          <NavbarBackend />
          <Switch>
            <Route path="/dashboard/practices" exact component={PracticesList} />
            <Route path="/dashboard/practice/create" component={CreatePractice} />
            <Route path="/dashboard/practice/edit/:id" component={EditPractice} />

            <Route path="/dashboard/teachers" component={TeachersList} />
            <Route path="/dashboard/teacher/create" exact component={CreateTeacher} />
            <Route path="/dashboard/teacher/edit/:id" component={EditTeacher} />
            <Route path="/dashboard/teacher/:id" exact component={Teacher} />
          </Switch>
        </div>
      ) : (
          <>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
          </>
        )}

    </div>
  )
};

export default Dashboard;
