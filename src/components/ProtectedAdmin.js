import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../_helpers/userContext'

function ProtectedRoute({ children, role }) {  
  const { user } = useContext(UserContext)
  if(role) {
    if(user && user.role !== role) {
        return <Navigate to="/admin/login" />
    }
  }
  return user ? children : <Navigate to={`/login`} />
}

export default ProtectedRoute