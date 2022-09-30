import { useEffect, useState } from "react"
import { Modal, ModalBody, Button, ModalHeader } from "reactstrap"
import { BallTriangle } from 'react-loader-spinner';
import AddTask from "./AddTask";
import ViewTask from "./ViewTask";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/reducer/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/reducer/auth";
import { addStudent, deleteStudent, editStudent, studentList } from "../redux/reducer/student";

export default function Home() {
    const { studentData } = useSelector((state) => state.student);
    const { user, token } = useSelector((state) => state.auth);
    const [studentlist, setStudent] = useState([])
    const [loader, setLoader] = useState(true);
    const [isNewTask, setNewTask] = useState('')
    const [isViewTask, setViewTask] = useState('');
    const dispatch = useDispatch()
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
        mobileNumber: ""
    })
    const [newStudentData, setStudentData] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        address: ""
    })
    const [isEdit, setEdit] = useState(false)
    const [isModal, setShowModal] = useState(false)
    const [isNewTaskModal, setNewTaskModal] = useState(false);


    useEffect(() => {
        if(token){
            dispatch(studentList(token))
            dispatch(getCurrentUser(token))
            setLoader(false)
        }
        else{
            nav("/login")
        }
        
    }, [])

    useEffect(() => {
        setCurrentUser(user)
        setStudent(studentData)
    }, [user, studentData])

    function handleModal() {
        setStudentData({
            name: "",
            email: "",
            mobileNumber: "",
            address: ""
        })
        setShowModal(true)
    }

    async function handleAddStudent() {
        if (!newStudentData.name) return alert("please enter student name");
        var data = { ...newStudentData, token: token };
        dispatch(addStudent(data)).then((res) => {
            if (res.payload.status) {
                alert("new Student added");
                window.location.reload();
            } else {
                alert(res.payload.err)
            }
        }).catch((e) => {
            console.log(e)
        });
    }

    async function handleAddTask(data) {
        setNewTask(data);
        setNewTaskModal(true)
    }

    function handleViewTask(data) {
        nav("/viewTask",{state:{id:data._id}});
        // setViewTask(data._id)
    }

    function handleLogout() {
        let isLogout = window.confirm("are you sure want to logout");
        if(isLogout){
            dispatch(logout()).then((res)=>{
               nav("/login")
            }); 
        }
    }

    async function handleEditStudent() {
        if (!newStudentData.name) return alert("please enter  student name");
        var data = { ...newStudentData, token: token }
        dispatch(editStudent(data)).then((resp) => {
            if (resp.payload.status) {
                alert(resp.payload.msg);
                window.location.reload();
            } else {
                alert(resp.payload.err)
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    function handleEdit(data) {
        setEdit(true)
        setStudentData(data);
        setShowModal(true);
    }

    async function handleDelete(id) {
        let isDelete = window.confirm("are you sure want to delete");
        if (isDelete) {
            var data = { id: id, token: token }
            dispatch(deleteStudent(data)).then((resp) => {
                if (resp.payload.status) {
                    alert(resp.payload.msg);
                    window.location.reload();
                } else {
                    alert(resp.payload.err)
                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    return (
        <>
            {
                loader ? <BallTriangle
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="three-dots-loading"
                    wrapperStyle
                    wrapperClass
                /> :
                    <div className="row justify-content-sm-center">
                        <div className="row d-flex justify-content-sm-center">
                            <div className="col-sm-8">
                            <h1 className="mb-2 mt-2" style={{color:"darkblue"}}>Staff in Mobigic Technology</h1>
                            <Button
                                    onClick={handleModal}
                                    className="mb-2 justify-content-sm-right">
                                    Add New Staff
                                </Button>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="form-group chip">Name</th>
                                            <th className="form-group chip">email</th>
                                            <th className="form-group chip">Number</th>
                                            <th className="form-group chip">Address</th>
                                            <th className="form-group chip">Task</th>
                                            <th className="form-group chip">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentlist.length && studentlist?.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="chip" style={{color:"InfoText"}}>{data.name}</td>
                                                    <td className="chip">{data.email}</td>
                                                    <td className="chip" style={{color:"Highlight"}}>{data.mobileNumber}</td>
                                                    <td className="chip">{data.address}</td>
                                                    <td className="chip">
                                                        <button className="btn btn-primary mb-2" onClick={() => { handleAddTask(data) }} >New</button> <br />
                                                        <button className="btn btn-success" onClick={() => { handleViewTask(data) }} >View</button>
                                                    </td>
                                                    <td className="chip justify-content-space-between">
                                                        <button className="btn btn-secondary" onClick={() => { handleEdit(data) }} >Edit</button>&nbsp;
                                                        <button className="btn btn-danger" onClick={() => { handleDelete(data._id) }} >Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-2">
                            <span style={{color:"green"}}>Logged In:<h4 style={{color:"blue"}}>{currentUser.name}</h4></span>
                            <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                        </div>
                        </div>
                        <div className="col-sm-4">
                            {isNewTask ? <AddTask task={isNewTask} isNewTaskModal={isNewTaskModal} setNewTaskModal={setNewTaskModal} /> : ""}
                            {isViewTask ? <ViewTask id={isViewTask} /> : ""}
                        </div>
                       
                        <div className="col-sm-6">
                                <Modal
                                    isOpen={isModal}
                                >
                                    <ModalBody>
                                        <ModalHeader>
                                            {isEdit ? <h4>Update Student</h4> : <h4>Add New Student</h4>}
                                        </ModalHeader>
                                        <div className="row">
                                            <div className="form-group col-sm-12">
                                                <label for="exampleInputEmail1">Name</label>
                                                <input type="text" className="form-control" value={newStudentData.name} onChange={(e) => setStudentData({ ...newStudentData, name: e.target.value })} placeholder="Enter Name" />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label>Email</label>
                                                <input type="email" className="form-control" value={newStudentData.email} onChange={(e) => setStudentData({ ...newStudentData, email: e.target.value })} placeholder="Email" />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label>Mobile Number</label>
                                                <input type="text" className="form-control" value={newStudentData.mobileNumber} onChange={(e) => setStudentData({ ...newStudentData, mobileNumber: e.target.value })} placeholder="Mobile Number" />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label>Address</label>
                                                <input type="text" className="form-control" value={newStudentData.address} onChange={(e) => setStudentData({ ...newStudentData, address: e.target.value })} placeholder="Address" />
                                                <br />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        {isEdit ? <button type="submit" className="btn btn-success" onClick={handleEditStudent}>Edit</button> : <button type="submit" className="btn btn-success" onClick={handleAddStudent}>Add</button>}
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <button type="submit" className="btn btn-danger" onClick={() => { setShowModal(false); setEdit(false) }}>Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ModalBody>
                                </Modal>
                            </div>
                    </div>
                    
            }
        </>
    )
}