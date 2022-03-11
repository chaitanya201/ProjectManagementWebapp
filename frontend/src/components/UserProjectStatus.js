import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserSingleProject from './UserSingleProject';
export default function UserProjectStatus() {

    const [allProjects, setAllProjects] = useState(null);

    const location = useLocation();
    useEffect(() => {
        const getAllProjects = async () => {
            const {status, userID} = location.state
            console.log("status is ", status);
            const url = "http://localhost:5000/user/get-projects-for-updation/?status=" + status + "&_id=" + userID
            console.log("url is ", url);
            const response = await axios.get(url)
            if((await response).data.status === "success") {
                setAllProjects((response.data.allProjects))
            }
        }

        getAllProjects()
        
    }, []);

    
  return (
    <div>
        <div>
            {
                allProjects? allProjects.length > 0 ? allProjects.map((project) => {
                    return <UserSingleProject project={project}  key={project._id} />
                }) :
                <div>No projects found</div> : <div>not found</div>
            }
        </div>

    </div>
  )
}
