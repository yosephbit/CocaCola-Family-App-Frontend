import React, { useEffect } from 'react'
// import { MdViewColumn, MdRemove,MdArrowDownward, MdSearch, MdChevronLeft,
//     MdChevronRight, MdLastPage, MdFirstPage, MdFilterList, MdSaveAlt, MdEdit, MdDeleteOutline,
//     MdClear, MdCheck, MdAddBox } from "react-icons/md";
// import MaterialTable from 'material-table'

function AdminScore() {
    // const [dataSource, setDataSource] = useState([])
    // const [loading] = useState(false)
    // const tableIcons = {
    //     Add: forwardRef((props, ref) => <MdAddBox {...props} ref={ref} />),
    //     Check: forwardRef((props, ref) => <MdCheck {...props} ref={ref} />),
    //     Clear: forwardRef((props, ref) => <MdClear {...props} ref={ref} />),
    //     Delete: forwardRef((props, ref) => <MdDeleteOutline {...props} ref={ref} />),
    //     DetailPanel: forwardRef((props, ref) => <MdChevronRight {...props} ref={ref} />),
    //     Edit: forwardRef((props, ref) => <MdEdit {...props} ref={ref} />),
    //     Export: forwardRef((props, ref) => <MdSaveAlt {...props} ref={ref} />),
    //     Filter: forwardRef((props, ref) => <MdFilterList {...props} ref={ref} />),
    //     FirstPage: forwardRef((props, ref) => <MdFirstPage {...props} ref={ref} />),
    //     LastPage: forwardRef((props, ref) => <MdLastPage {...props} ref={ref} />),
    //     NextPage: forwardRef((props, ref) => <MdChevronRight {...props} ref={ref} />),
    //     PreviousPage: forwardRef((props, ref) => <MdChevronLeft {...props} ref={ref} />),
    //     ResetSearch: forwardRef((props, ref) => <MdClear {...props} ref={ref} />),
    //     Search: forwardRef((props, ref) => <MdSearch {...props} ref={ref} />),
    //     SortArrow: forwardRef((props, ref) => <MdArrowDownward {...props} ref={ref} />),
    //     ThirdStateCheck: forwardRef((props, ref) => <MdRemove {...props} ref={ref} />),
    //     ViewColumn: forwardRef((props, ref) => <MdViewColumn {...props} ref={ref} />)
    // };

    useEffect(() => {
        // [
        //     { name: 'Mehmet', phone: '+6512345678', createdAt: "2nd Jan, 2022" },
        //     { name: 'Mehmet', phone: '+6512345678', createdAt: "2nd Jan, 2022" },
        //     { name: 'Kaleb', phone: '+6512345678', createdAt: "2nd Jan, 2022" },
        //     { name: 'Kaleb', phone: '+6512345678', createdAt: "2nd Jan, 2022" },
        //     { name: 'Kaleb', phone: '+6512345678', createdAt: "2nd Jan, 2022" },
        //     { name: 'Kaleb', phone: '+6512345678', createdAt: "2nd Jan, 2022" },
        //     { name: 'Mehmet', phone: '+6512345678', createdAt: "2nd Jan, 2022" },
        //     { name: 'Mehmet', phone: '+6512345678', createdAt: "2nd Jan, 2022" },
        //     { name: 'Kaleb', phone: '+6512345678', createdAt: "2nd Jan, 2022" },
        // ]
        // setDataSource(data)
    }, [])

    return (
        <div className="users">
            <div className="users__header fl-row align-center">
                <div className="line"></div>
                <p className="text">Scores</p>
                <div className="line"></div>
            </div>

            <div className="users__content fl-col">
                {/* <MaterialTable
                    title="Users"
                    search={false}
                    icons={tableIcons}
                    isLoading={loading}
                    columns={[
                        { title: 'NAME', field: 'name' },
                        { title: 'PHONE', field: 'phone' },
                        { title: 'DATE', field: 'createdAt' },
                    ]}
                    data={dataSource}
                /> */}
            </div>
        </div>
    )
}

export default AdminScore