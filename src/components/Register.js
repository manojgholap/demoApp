import { useState } from "react"
import { useDispatch } from "react-redux";
import { register } from "../redux/reducer/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const nav = useNavigate();
    const [requestData, setRequestData] = useState({
        email: "",
        password: "",
        name:"",
        address:"",
        mobileNumber:"",
        confirmPassword:""
    })
    const dispatch = useDispatch();

    async function handleClick() {
        if (!requestData.email) return alert("enter your email");
        if (!requestData.password) return alert("enter your password");
        if(requestData.password!==requestData.confirmPassword) return alert("password is not matching!")
        dispatch(register(requestData)).then((res)=>{
            if(res.payload.status){
                alert(res.payload.msg);
                nav("/");
            }else{
                alert(res.payload.err)
            }
        })
    }
    return (
        <>
            <div className="row justify-content-sm-center">
                <div className="card col-sm-4 mt-5">
                    <h1>Sign Up</h1>
                    <label>Name</label>
                    <input type="text" className="form-group form-control"  onChange={(e) => setRequestData({ ...requestData, name: e.target.value })} placeholder="Enter Name" />
                    <label>Email address</label>
                    <input type="email" className="form-group form-control" onChange={(e) => setRequestData({ ...requestData, email: e.target.value })} placeholder="Enter Email" />
                    <label>Mobile Number</label>
                    <input type="number" className="form-group form-control"  onChange={(e) => setRequestData({ ...requestData, mobileNumber: e.target.value })} placeholder="Enter Mobile Number" />
                    <label>Address</label>
                    <input type="text" className="form-group form-control"  onChange={(e) => setRequestData({ ...requestData, address: e.target.value })} placeholder="Enter Address" />
                    <label>Password</label>
                    <input type="password" className="form-group form-control" onChange={(e) => setRequestData({ ...requestData, password: e.target.value })} placeholder="Password" />
                    <label>Confirm Password</label>
                    <input type="password" className="form-group form-control" onChange={(e) => setRequestData({ ...requestData, confirmPassword: e.target.value })} placeholder="Confirm Password" />
                    <button type="submit" className=" form-group forn-control btn btn-danger mb-1 col-sm-2 mt-2" onClick={handleClick}>Register</button>
                    <span className="mb-2">All ready have Account?<Link to="/login">click here</Link></span>
                </div>
            </div>
        </>
    )
}