import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'

function AdminUsers() {
    const [dataSource, setDataSource] = useState([])
    const [loading] = useState(false)

    useEffect(() => {
        const data = [
            { name: 'Mehmet', phone: 'Baran', createdAt: "2nd Jan, 2022" },
            { name: 'Mehmet', phone: 'Baran', createdAt: "2nd Jan, 2022" },
            { name: 'Kaleb', phone: 'Baran', createdAt: "2nd Jan, 2022" },
        ]
        setDataSource(data)
    }, [])
    return (
        <div className="users">
            <div className="users__header fl-row align-center">
                <div className="line"></div>
                <p className="text">Users</p>
                <div className="line"></div>
            </div>

            <div className="users__content fl-col">
                <MaterialTable
                    isLoading={loading}
                    columns={[
                        { title: 'NAME', field: 'name' },
                        { title: 'PHONE', field: 'phone' },
                        { title: 'CREATED AT', field: 'createdAt' },
                    ]}
                    data={dataSource}
                    title="Demo Title"
                />
            </div>
        </div>
    )
}

export default AdminUsers
