import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import RouteContext from '../_helpers/routeContext'
import UserContext from '../_helpers/userContext'

function ProtectedRoute({ children }) {  
  const { user } = useContext(UserContext)
  const { path } = useContext(RouteContext)
  const { pathname } = useLocation()

  if(path && path.via === "LINK" && pathname === "/game") {
    return children
  }
  return user ? children : <Navigate to={`/login`} />
}

export default ProtectedRoute