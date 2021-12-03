import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../_helpers/userContext'

function ProtectedAdmin({ children }) {
  const { user } = useContext(UserContext)
  if (!user || !user.token) {
    return <Navigate to="/admin/login" />
  }
  return children
}

export default ProtectedAdmin