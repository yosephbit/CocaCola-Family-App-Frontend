import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

function AdminPage() {
    const { pathname } = useLocation()
    const pathArr = pathname.split("/")

    return (
        <div className="page admin">
            { (pathArr[pathArr.length - 1] === 'admin' || pathArr[pathArr.length - 1] === '') && ( <Navigate to="/admin/dashboard" /> ) }
            <Outlet />
        </div>
    )
}

export default AdminPage
