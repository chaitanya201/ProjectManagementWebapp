import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShowProjects from './ShowProjects';
export default function UpdateProjectStatus() {
    // setTitle, setDesc, setHead, setMembers
    const user = useSelector((state) => state.userObj.userObj)
    const [allProjects, setAllProjects] = useState(null);
    const [users, setUsers] = useState(null);
    // creating states for changing title, des, head and members and
    // passing them to child components
    const [name, setName] = useState(null);


    useEffect(() => {
        const getAllProjects = async () => {
            const projects = await axios.get("http://localhost:5000/user/get-projects-for-updation")
            if (projects.data.status === "success") {
                setAllProjects(projects.data.allProjects)
            }
        }
        getAllProjects()

        const getAllUsers = async () => {
            const res = await axios.get("http://localhost:5000/user/getUsers")
            if(res.data) {
                if(res.data.status === "success") {
                    setUsers(res.data.users)
                }
            }
        }
        getAllUsers()

    }, [])
    console.log("all projects", allProjects);
    console.log("all users", users);

  return (
    <div>
        <h1 className=" flex justify-center text-2xl">Update Projects</h1>
        {
            allProjects ? allProjects.length > 0 ? allProjects.map((project) => {
            return <ShowProjects project={project} users = {users} key={project._id} />
        }) : <div>no projects</div> : <div>not found</div>
            
        }
    </div>
  )
}
