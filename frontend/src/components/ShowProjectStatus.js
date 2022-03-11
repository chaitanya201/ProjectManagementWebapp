import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ShowProjects from './ShowProjects';
export default function ShowProjectStatus() {

    const [users, setUsers] = useState(null);
    const [allProjects, setAllProjects] = useState(null);

    const location = useLocation();
    useEffect(() => {
        const getAllProjects = async () => {
            const {status} = location.state
            console.log("status is ", status);
            const url = "http://localhost:5000/user/get-projects-for-updation/?status=" + status
            console.log("url is ", url);
            const response = await axios.get(url)
            if((await response).data.status === "success") {
                setAllProjects((response.data.allProjects))
            }
        }

        getAllProjects()
        const getAllUsers = async () => {
            const users = await axios.get("http://localhost:5000/user/getUsers")
            if(users.data) {
                if(users.data.status === "success") {
                    setUsers(users.data.users)
                }
            }
        }
        getAllUsers()
        
    }, []);

    
  return (
    <div>
        <div>
            {
                allProjects? allProjects.length > 0 ? allProjects.map((project) => {
                    return <ShowProjects project={project} users={users} key={project._id} />
                }) :
                <div>No projects found</div> : <div>not found</div>
            }
        </div>

    </div>
  )
}
