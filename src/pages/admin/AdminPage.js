import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

function AdminPage() {
    const { pathname } = useLocation()
    
    return (
        <div className="page admin">
            { pathname === '/admin/' && (<Navigate to="/admin/dashboard" />) }
            <Outlet />
        </div>
    )
}

export default AdminPage
