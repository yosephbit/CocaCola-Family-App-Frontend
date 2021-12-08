import React, { forwardRef, useEffect, useState, useContext } from 'react'
import {
    MdViewColumn, MdRemove, MdArrowDownward, MdSearch, MdChevronLeft,
    MdChevronRight, MdLastPage, MdFirstPage, MdFilterList, MdSaveAlt, MdEdit, MdDeleteOutline,
    MdClear, MdCheck, MdAddBox
} from "react-icons/md";
import MaterialTable from 'material-table'
import { adminGetQuestions } from '../../_helpers/cloudFunctions';
import Popup from 'reactjs-popup';
import QuestionModal from '../../components/QuestionModal';
import UserContext from '../../_helpers/userContext';
// import { useSearchParams } from 'react-router-dom';

function AdminQuestions() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null)
    // const [searchParams, setSearchParams] = useSearchParams();
    const [pager, setPager] = useState({page: 1, pageSize: 8})
    const toggleModal = (state) => {
        setOpen(state);
        !state && setDeleting(false);
    }

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
        // setSearchParams({ ...pager })
        adminGetQuestions(user.user, user.token, pager.page, pager.pageSize)
            .then(res => {
                console.log(res.data)
                buildDataSource(res.data)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })
        // getQuiz(50, user?.user, user?.token, 8, 1)
        //     .then((res) => {
        //         setLoading(false)
        //         let { questions } = res.data
        //         questions = questions.map(ques => {
        //             return {
        //                 questionId: ques.question.questionId,
        //                 question: ques.question.questionText,
        //                 choice1: ques.answers.choice1.choiceText,
        //                 choice2: ques.answers.choice2.choiceText,
        //                 choice1Id: ques.answers.choice1.choiceId,
        //                 choice2Id: ques.answers.choice2.choiceId,
        //             }
        //         })
        //         setDataSource(questions)
        //     })
        //     .catch(e => {
        //         setLoading(false)
        //         console.log(e)
        //     })
        
        //eslint-disable-next-line
    }, [pager])

    // useEffect(() => {
    //     setSearchParams({ ...pager })
    //     setLoading(true)
    //     adminGetQuestions(user.user, user.token, pager.page -1, pager.pageSize)
    //         .then(res => {
    //             console.log(res.data)
    //             buildDataSource(res.data)
    //             setLoading(false)
    //         })
    //         .catch(e => {
    //             console.log(e)
    //             setLoading(false)
    //         })
    // }, [pager])
    
    return (
        <div className="users">
            <div className="users__header fl-row align-center">
                <div className="line"></div>
                <p className="text">Questions</p>
                <div className="line"></div>
            </div>

            <div className="users__content fl-col">
                <button onClick={() => { toggleModal(true); setSelectedQuestion(null) }} className="img-btn self-end">Add Question</button>
                <MaterialTable
                    title="Questions"
                    search={false}
                    icons={tableIcons}
                    isLoading={loading}
                    columns={[
                        { title: 'QUESTION', field: 'question' },
                        { title: 'CHOICE 1', field: 'choice1' },
                        { title: 'CHOICE 2', field: 'choice2' },
                    ]}
                    data={dataSource}
                    components={{
                        // Pagination: "null"
                    }}
                    actions={[
                        {
                            icon: () => <MdEdit color="blue" />,
                            tooltip: 'Edit Question',
                            onClick: (event, rowData) => {
                                setSelectedQuestion(rowData)
                                toggleModal(true)
                            }
                        },
                        {
                            icon: () => <MdDeleteOutline color="red" />,
                            tooltip: 'Delete Question',
                            onClick: (event, rowData) => {
                                setSelectedQuestion(rowData)
                                setDeleting(true)
                                toggleModal(true)
                            }
                        },
                    ]}
                    onChangePage={(page, pageSize) => {console.log("change happened", page, pageSize); setPager({page, pageSize})}}
                />
            </div>
            <Popup open={open} className="ques-popup" closeOnDocumentClick={false} onClose={() => toggleModal(false)}>
                <QuestionModal deleting={deleting} selectedQuestion={selectedQuestion} close={toggleModal} />
            </Popup>
        </div>
    )

    function buildDataSource(data) {
        const questions = data.map(dt => {
            let que = {id: dt[0], question: dt[1].questionText}
            return que
        })
        setDataSource(questions)
    }
}

export default AdminQuestions
