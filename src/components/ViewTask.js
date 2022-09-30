import { useEffect, useState } from "react"
import { formatDateProper } from "../util"
import { useSelector,useDispatch } from "react-redux"
import { getStudentTask } from "../redux/reducer/student"
import {useLocation} from 'react-router-dom';
export default function ViewTask() {
    const location = useLocation();
    const [taskList, setTaskList] = useState([])
    const {token} = useSelector((state)=>state.auth)
    const {studentTask} = useSelector((state)=>state.student)
    const dispatch = useDispatch();
    useEffect(() => {
        var data = {token:token,id:location.state.id}
        dispatch(getStudentTask(data))
    }, [])

    useEffect(()=>{
        setTaskList(studentTask)
    },[studentTask])
    return (
        <>
         { taskList.length?
         <div className="row d-flex justify-content-sm-center">
            <div className="col-sm-8  ml-10">
            <h1>Task List For : {taskList[0]?.studentId?.name||"-"}</h1>
                <table>
                    <thead>
                        <tr>
                        <th className="form-group chip">Subject</th>
                        <th className="form-group chip">Type</th>
                        <th className="form-group chip">Priority</th>
                        <th className="form-group chip">Deadline</th>
                        <th className="form-group chip">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskList.length && taskList?.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td className="chip">{data?.subject}</td>
                                    <td className="chip">{data?.type}</td>
                                    <td className="chip">{data?.priority}</td>
                                    <td className="chip">{formatDateProper(data?.deadline)}</td>
                                    <td className="chip">{data?.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <br />
            </div>
        </div>
        :<h1>No Data Found</h1>}
        </>)
}