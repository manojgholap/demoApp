import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import service from "../services";
import { useSelector, useDispatch } from "react-redux";
import { addStudentTask } from "../redux/reducer/student";


export default function AddTask(props) {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [newTaskData, setTaskData] = useState({
        subject: "",
        type: "",
        priority: "",
        deadline: "",
        status: ""
    })

    async function handleAddTask() {
        if (!newTaskData.subject) return alert("subject is required");
        let data = { ...newTaskData, studentId: props.task._id, token: token }
        dispatch(addStudentTask(data)).then((resp) => {
            if (resp.payload.status) {
                alert(resp.payload.msg);
                window.location.reload();
            }
            else {
                alert(resp.data.err)
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <>
            <Modal
                isOpen={props.isNewTaskModal}
            >
                <ModalBody>
                    <ModalHeader>
                        <h4>Assine Task to : {props.task.name}</h4>
                    </ModalHeader>
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <label>Subject</label>
                            <input type="text" className="form-control" onChange={(e) => setTaskData({ ...newTaskData, subject: e.target.value })} placeholder="Enter Subject" />
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Task Type</label>
                            <select className="form-control" onChange={(e) => setTaskData({ ...newTaskData, type: e.target.value })}>
                                <option value="">Select Task</option>
                                <option value="bug">Bug</option>
                                <option value="story">Story</option>
                                <option value="enahncement">Enahncement</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Priority</label>
                            <select className="form-control" onChange={(e) => setTaskData({ ...newTaskData, priority: e.target.value })}>
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Deadline</label>
                            <input type="date" className="form-control" onChange={(e) => setTaskData({ ...newTaskData, deadline: e.target.value })} />
                            <br />
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Status</label>
                            <select className="form-control" onChange={(e) => setTaskData({ ...newTaskData, status: e.target.value })}>
                                <option value="pending">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">IN Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <br />
                        </div>
                        <div className="col-sm-6 form-group">
                            <div className="row">
                                <div className="col-sm-3">
                                    <button type="submit" className="btn btn-success" onClick={handleAddTask}>Add</button>
                                </div>
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-danger" onClick={() => { props.setNewTaskModal(false); }}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}