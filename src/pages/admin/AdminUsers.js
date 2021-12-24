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
import { UserLinksModal } from '../../components/.';
import { CSVLink } from "react-csv";

function AdminUsers() {
    const [dataSource, setDataSource] = useState([])
    const [dataSourceExport, setDataSourceExport] = useState([])
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

    const headers = [
        { label: "Name", key: "name" },
        { label: "Phone Number", key: "phone_number" },
        { label: "Created Date", key: "created_at" },
        { label: "Link", key: "invitationId" },
        { label: "Link Creation Date", key: "linkTimestamp" },
        { label: "For", key: "relation" },
        { label: "Score", key: "percentage" },
        { label: "Participation Code", key: "shareCode" },
        { label: "Participation Date", key: "participationDate" },
    ];

    useEffect(() => {
        getUsers(user?.user, pager.pageSize, pager.page, user?.token).then(res => {
            buildDataSourceForExport(res.data.users)
            buildDataSource(res.data.users)
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            console.log(e)
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

            <div className="users__content fl-col actions">
                <CSVLink filename="users" className="self-end actions__btn mb-15" data={dataSourceExport} headers={headers}>
                    Export XLS
                </CSVLink>

                <MaterialTable
                    title="Users"
                    search={false}
                    icons={tableIcons}
                    isLoading={loading}
                    columns={[
                        { title: 'NAME', field: 'name' },
                        { title: 'PHONE', field: 'phone_number' },
                        { title: 'DATE', field: 'created_at' },
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

    function buildDataSourceForExport(data) {
        let response = []
        let users = data.map(user => {
            response.push({
                userId: user[0],
                ...user[1],
                created_at: (new Date(user[1].created_at)).toLocaleString(),
            })
            user[1].links.map(([linkId, links]) => {
                const score = user[1].scores.filter(([scoreId, score]) => score.invitationId === linkId)
                if (score.length === 0) {
                    response.push({ invitationId: linkId, percentage: 'Link Not Used Yet', linkTimestamp: (new Date(links.timeStamp)).toLocaleString(), ...links });
                } else {
                    let linkscore = score.pop()[1]
                    response.push({ userId: '', created_at: '', phone_number: '', linkTimestamp: (new Date(links.timeStamp)).toLocaleString(), ...links, participationDate: (new Date(linkscore.timeStamp)).toLocaleString(), ...linkscore, percentage: linkscore.percentage.toFixed(0) })
                }
            })
            user[1].scores?.map(([challegeId, challenge]) => { if (!challenge.challangeId) response.push({ userId: '', created_at: '', phone_number: '', invitationId: 'Play Together', participationDate: (new Date(challenge.timeStamp)).toLocaleString(), ...challenge }) })

        })

        setDataSourceExport(response)
    }
    function buildDataSource(data) {
        let users = data.map(user => {
            return {
                userId: user[0], ...user[1],
                created_at: new Date(user[1].created_at).toLocaleString(),
            }
        })
        setDataSource(users)
    }
}

export default AdminUsers
