import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import UserContext from '../_helpers/userContext'

function ProtectedRoute({ children }) {
  let { pathname } = useLocation()
  let pathArr = pathname.split('/')
  let rootUrl = pathArr[pathArr.length - 2] || ''

  const { user } = useContext(UserContext)
  return user ? children : <Navigate to={`/${rootUrl ? rootUrl+'/' : ''}login`} />
}

export default ProtectedRoute