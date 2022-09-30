import { useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "../redux/reducer/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
    const nav= useNavigate()
    const [requestData, setRequestData] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch();

    async function handleClick() {
        if (!requestData.email) return alert("enter your email");
        if (!requestData.password) return alert("enter your password");
        dispatch(login(requestData)).then((resp)=>{
            if(!resp.payload.status){
                alert(resp.payload.err);
            }
            else{
                alert("logged in")
                nav("/home")
            }
        })
    }
    return (
        <>
            <div className="row justify-content-sm-center">
                <div className="card col-sm-4 mt-5">
                    <h1>Sign In</h1>
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-group form-control" aria-describedby="emailHelp" onChange={(e) => setRequestData({ ...requestData, email: e.target.value })} placeholder="Enter email" />
                    <label>Password</label>
                    <input type="password" className="form-group form-control" onChange={(e) => setRequestData({ ...requestData, password: e.target.value })} placeholder="Password" />
                    <button type="submit" className=" form-group forn-control btn btn-danger mb-1 col-sm-2 mt-2" onClick={handleClick}>Login</button>
                    <span className="mb-2">Dont have Account yet?<Link to="/register">click here</Link></span>
                </div>
            </div>
        </>
    )
}