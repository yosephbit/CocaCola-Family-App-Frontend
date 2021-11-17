import React, { useContext } from 'react'
import { Route } from 'react-router'
import UserContext from '../context/userContext'

function ProtectedRoute({component: Component, ...rest}) {
    const {user} = useContext(UserContext)
    if(!user) {
        return <Route {...rest}  />
    }
    return (
        <Component {...rest} {...props} />
    )
}

export default ProtectedRoute
/* 
import { Redirect, Route } from "react-router-dom";
import { isLoggedIn } from "../_services/auth.service";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = isLoggedIn();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!loggedIn) {
          return <Redirect to="/login" />;
        } else if (props.location.pathname === "/login") {
          return <Redirect to="/admin" />;
        } else {
          return <Component {...rest} {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;

*/