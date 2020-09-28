import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Button from '@material-ui/core/Button';

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        <Button variant="outlined" color="secondary" size="small" onClick={logout}>
          Log out
        </Button>
      ) : (
          <>
            <Button variant="outlined" color="secondary" size="small" onClick={register}>Register</Button>
            <Button variant="outlined" color="secondary" size="small" onClick={login}>login</Button>
          </>
        )}
    </nav>
  );
}
