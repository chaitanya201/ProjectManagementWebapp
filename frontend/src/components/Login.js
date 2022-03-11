
import React, {useState} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import {changeLoginState} from '../store/userLoginSlice'
import {updateUser} from '../store/userObjSlice'
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from './Alert'
export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentLoginStatus = useSelector((state) => state.userLoginInfo.isLoggedIn)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMsg, setAlertMsg] = useState(null);
    const alterMsgColor= "red"
    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const onFormSubmit = async (event) => {
        event.preventDefault();
        const user = {
            email:email,
            password: password
        }
        const response = await axios.post("http://localhost:5000/user/login", user);
        
        if(response.data.status === "success"){
            console.log("data after login is ", response.data.user);
            dispatch(changeLoginState(true));
            dispatch(updateUser(response.data.user))
            navigate("/user-home")
        } else {
            console.log("failed to login");
            setAlertMsg("Email or Password is incorrect")
        }
    }
    // if(currentLoginStatus) {
    //     console.log("login is success");
    //     return <Navigate to="/profile" replace={true} />
    // }



    // using "navigate(path)" i can directly navigate to other paths without using return statements and from any function.
    // so i can navigate from any function to any page without using return statement.
    // 
    return (
    <div>
    { alertMsg ? <Alert msg={alertMsg} alertColor={alterMsgColor} /> : <div> </div>}
        <div className='h-screen flex bg-gray-100'>
        
        <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
            <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>Login 🔐</h1>
            <form method='post' onSubmit={onFormSubmit} >
                <input type="email" name='email' placeholder='Email' onChange={onEmailChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                <br />
                <input type="password" name='password' placeholder='Password' onChange={onPasswordChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                <div className='flex justify-center items-center mt-6'>
                    <input type="submit" value='Login' className="w-full px-6 py-2 mt-4 text-white bg-emerald-600 rounded-lg hover:bg-blue-900" /> 

                </div>
            </form> 
        </div>
    </div>
    </div>
    )
}
