import axios from 'axios'
import url  from '../apis/apiUrl'

const userservice = {
    login:async (data)=>{
        return axios.post(`${url.apiUrl}/user/login`,data)
    },
    getCurrentUser:async(token)=>{
        return axios.post(`${url.apiUrl}/user/currentUser`,{token});
    },
    register:async(data)=>{
        return axios.request({
            url:`${url.apiUrl}/user/register`,
            method:"POST",
            data:data,
        })
    },
    logout:async()=>{
        return {msg:"logging out"}
    }
}

export default userservice