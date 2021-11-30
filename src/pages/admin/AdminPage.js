import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminPage() {

    return (
        <div className="page">
            {/* {pathname !== '/admin/login' && (
                <div className="fl-row just-center" style={{ marginBottom: '15px' }}>
                    <Link to="login">
                        <button>Login</button>
                    </Link>
                    <Link to="links">
                        <button>Links</button>
                    </Link>
                    <Link to="scores">
                        <button>Scores</button>
                    </Link>
                    <Link to="users">
                        <button>Users</button>
                    </Link>
                </div>
            )} */}
            <Outlet />
        </div>
    )
}

export default AdminPage
