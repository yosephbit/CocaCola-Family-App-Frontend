import React, { useContext, useEffect, useState, forwardRef } from 'react'
import { MdViewColumn, MdRemove,MdArrowDownward, MdSearch, MdChevronLeft,
    MdChevronRight, MdLastPage, MdFirstPage, MdFilterList, MdSaveAlt, MdEdit, MdDeleteOutline,
    MdClear, MdCheck, MdAddBox } from "react-icons/md";
import MaterialTable from 'material-table'
import { adminGetScoreList } from '../../_helpers/cloudFunctions';
import UserContext from '../../_helpers/userContext';

function AdminScore() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(true)
    const [pager, setPager] = useState({page: 0, pageSize: 50})
    const {user} = useContext(UserContext)
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
        adminGetScoreList(user.user, user.token, pager.page, pager.pageSize)
            .then(res => {
                console.log(res.data)
                buildDataSource(res.data.scores)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="users">
            <div className="users__header fl-row align-center">
                <div className="line"></div>
                <p className="text">Scores</p>
                <div className="line"></div>
            </div>

            <div className="users__content fl-col">
                <MaterialTable
                    title="Scores"
                    search={false}
                    icons={tableIcons}
                    isLoading={loading}
                    columns={[
                        { title: 'NAME', field: 'challengeId' },
                        { title: 'NETSCORE', field: 'netscore' },
                        { title: 'PERCENTAGE', field: 'percentage' },
                        { title: 'RESPONDANTID', field: 'respondantId' },
                        { title: 'SHARECODE', field: 'shareCode' },
                        {
                            title: 'DATE', field: 'created_at', type: 'date',
                            dateSetting: {
                                locale: "en-GB",
                                // format: 'dd, M yyyy'
                            },
                        },
                    ]}
                    data={dataSource}
                    onChangePage={(page, pageSize) => {setPager({page, pageSize})}}
                />
            </div>
        </div>
    )

    function buildDataSource(data) {
        const scores = data.map(dt => {
            let score = {
                id: dt[0],
                challengeId: dt[1].challangeId,
                link: dt[1].link,
                netscore: dt[1].netScore, 
                percentage: `${(dt[1].percentage || 0).toFixed(0)}%`,
                respondantId: dt[1].respondentId,
                shareCode: dt[1].shareCode,
                created_at: new Date(dt[1].timeStamp),
            }
            return score
        })
        setDataSource(scores)
    }
}

export default AdminScore