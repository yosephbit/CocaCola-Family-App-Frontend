import React, { useEffect, useState, forwardRef, useContext } from 'react'
import {
    MdViewColumn, MdRemove, MdArrowDownward, MdSearch, MdChevronLeft, MdVisibility,
    MdChevronRight, MdLastPage, MdFirstPage, MdFilterList, MdSaveAlt, MdEdit, MdDeleteOutline,
    MdClear, MdCheck, MdAddBox
} from "react-icons/md";
import MaterialTable from 'material-table'
import { getUsers } from '../../_helpers/cloudFunctions';
import UserContext from '../../_helpers/userContext'
import Popup from 'reactjs-popup';
import { UserLinksModal} from '../../components/.';

function AdminUsers() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(true)
    const [openLinks, setOpenLinks] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [pager] = useState({ page: 0, pageSize: 100 })
    const { user } = useContext(UserContext)
    const tableIcons = {
        Add: forwardRef((props, ref) => <MdAddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <MdCheck {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <MdClear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <MdDeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <MdChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <MdEdit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <MdSaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <MdFilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <MdFirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <MdLastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <MdChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <MdChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <MdClear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <MdSearch {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <MdArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <MdRemove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <MdViewColumn {...props} ref={ref} />)
    };

    useEffect(() => {
        getUsers(user?.user, pager.pageSize, pager.page, user?.token).then(res => {
            buildDataSource(res.data.users)
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            console.log(e.response)
        })
        // eslint-disable-next-line
    }, [pager])

    return (
        <div className="users">
            <div className="users__header fl-row align-center">
                <div className="line"></div>
                <p className="text">Users</p>
                <div className="line"></div>
            </div>

            <div className="users__content fl-col">
                <MaterialTable
                    title="Users"
                    search={false}
                    icons={tableIcons}
                    isLoading={loading}
                    columns={[
                        { title: 'NAME', field: 'name' },
                        { title: 'PHONE', field: 'phone_number' },
                        {
                            title: 'DATE', field: 'created_at', type: 'date',
                            dateSetting: {
                                locale: "en-GB",
                                // format: 'dd, M yyyy'
                            },
                        },
                    ]}
                    data={dataSource}
                    actions={[
                        {
                            icon: () => <MdVisibility color="grey" />,
                            tooltip: 'Show Links',
                            onClick: (event, rowData) => {
                                setSelectedUser(rowData)
                                setOpenLinks(true)
                            }
                        }
                    ]}
                    onChangePage={(pages, pageSizes) => { }}
                />
            </div>
            <Popup open={openLinks} className="users-popup" lockScroll position={["top center"]} closeOnDocumentClick={false} onClose={() => setOpenLinks(false)}>
                <UserLinksModal user={selectedUser} close={() => setOpenLinks(false)} />
            </Popup>

            {/* <Popup open={openScores} className="users-popup" lockScroll position={["top center"]} closeOnDocumentClick={false} onClose={() => setOpenScores(false)}>
                <UserScoresModal user={selectedUser} close={() => setOpenScores(false)} />
            </Popup> */}
        </div>
    )

    function buildDataSource(data) {
        let users = data.map(user => {
            return { 
                userId: user[0], 
                ...user[1],
                created_at: new Date(user[1].created_at),
            }
        })
        setDataSource(users)
    }
}

export default AdminUsers
