import React, { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
import UserContext from '../_helpers/userContext'

function ProtectedRoute({ component: Component, ...rest }) {
    const {user} = useContext(UserContext)
    return (
      <>
      <Route
        {...rest}
        render={(props) => {
          if (!user) {
            return <Navigate to="login" />;
          } else {
            return <Component {...rest} {...props} />;
          }
        }}
      />
      </>
    );
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