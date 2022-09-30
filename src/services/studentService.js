import axios from 'axios'
import url  from '../apis/apiUrl'

const studentService = {
    studentList:async (token)=>{
        return axios.request({
            url:`${url.apiUrl}/student`,
            method:"GET",
            params:{token}
        })
    },
    addStudent:async(data)=>{
        return axios.request({
            url:`${url.apiUrl}/student`,
            method:"POST",
            data:data
        })
    },
    editStudent:async(data)=>{
        return axios.request({
            url:`${url.apiUrl}/student/${data._id}`,
            method:"PATCH",
            data:data
        })
    },
    deleteStudent:async(data)=>{
        return axios.request({
            url:`${url.apiUrl}/student/${data.id}`,
            method:"DELETE",
            data:{token:data.token}
        })
    },
    addStudentTask:async(data)=>{
        return axios.request({
            url:`${url.apiUrl}/student/addTask`,
            method:"POST",
            data:data,
        })
    },
    getStudentTask:async(data)=>{
        return axios.request({
            url:`${url.apiUrl}/student/viewTask`,
            method:"POST",
            data:data,
        })
    }
}

export default studentService