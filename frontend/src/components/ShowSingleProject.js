import React from "react";
import { Link } from "react-router-dom";
import ProjectMembers from "./ProjectMembers";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShowUsersToSelectForProject from "./ShowUsersToSelectForProject";
import Alert from './Alert'

export default function ShowSingleProject() {
  // accessing the value from link component using useLocation hook
  const location = useLocation();
  const { project, users } = location.state;
  console.log("location state", location.state);
  let alertColor = "pink"
  const [msg, setMsg] = useState(null);
  const [title, setTitle] = useState(project.name);
  const [desc, setDesc] = useState(project.desc);
  const [head, setHead] = useState(project.head);
  const [members, setMembers] = useState(project.members);
  const [status, setStatus] = useState(project.status);
  let totalMembers = [];
    // const [totalEmployee, setTotalEmployee] = useState(users);
    const arrOfEmpID = []
    const arrayOfIDOfAllEmployee = []
    const arrayOfIDOfAllMembers = []
    for (let index = 0; index < users.length; index++) {
        if(users[index]) {
            arrayOfIDOfAllEmployee.push(users[index]._id)
        }
    }
    for (let index = 0; index < members.length; index++) {
        if(members[index]) {
            arrayOfIDOfAllMembers.push(members[index]._id)
        }
    }
    for (let index = 0; index < users.length; index++) {
        if(users[index]) {
            if(arrayOfIDOfAllMembers.includes(users[index]._id)) {
                delete users[index]
            }
        }
    }
    
    for (let index = 0; index < members.length; index++) {
        if(members[index]) {
            if(!arrayOfIDOfAllEmployee.includes(members[index]._id)) {
                arrOfEmpID.push(members[index]._id)
            }
        }
    }
    // for (let index = 0; index < totalEmployee.length; index++) {
    //     arrOfEmpID.push(totalEmployee[index]._id)
        
    // }
  const navigate = useNavigate()
  for (let index = 0; index < members.length; index++) {
    totalMembers.push(members[index]._id);
  }
  console.log("current members are ", totalMembers);
  console.log("total users are ", users);
  const onFormSubmit = async (event) => {

    const currentMembers = []
    for (let index = 0; index < totalMembers.length; index++) {
        if(totalMembers[index]) {
            currentMembers.push(totalMembers[index])
        }
    }

    for (let index = 0; index < arrOfEmpID.length; index++) {
        if(arrOfEmpID[index] && !currentMembers.includes(arrOfEmpID[index])) {
            currentMembers.push(arrOfEmpID[index])
        }
    }

    if(currentMembers.length <= 0) {
        console.log("setting the msg ");
        return setMsg("Select at least one member")
    }


    console.log("msg is ", msg);
    console.log("in form all members ", totalMembers);
    event.preventDefault();
    const newProject = {
        _id: project._id,
      name: title,
      desc,
      head,
      members: currentMembers,
      status
    };

    // saving all the data 
    const response = await axios.post("http://localhost:5000/user/update-project", newProject)
    console.log("response data is ", response.data);
    if(response.data.status === "success") {
        setMsg("success")
        console.log("success");
        console.log("msg is ", msg);
        alertColor = "emerald"
    } else {
        setMsg("failed")
    }

    // READ THIS 
    // BECAUSE OF THIS navigate we are redirecting to home page so we couldn't see the alert
    // **********************
    navigate("/user-home")

  };

  return (
    <div className="grid justify-items-center">
      {
        msg ? <Alert alertColor={alertColor} msg={msg} /> : 
        <div></div>
      }
      
      <form onSubmit={onFormSubmit} className="w-full max-w-sm  ">
        <label htmlFor="fhs" className=" px-2" >Title: </label>
        <input className="bg-gray-200 appearance-none border-2 py-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <br />
        <label htmlFor="fhs" className="py-2 px-2" >Description: </label>
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name"
          type="text"
          value={desc}
          onChange={(event) => {
            setDesc(event.target.value);
          }}
        />
        <br />
        <label htmlFor="fhs" className="py-2 px-2" >Project Head: </label>
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name"
          type="text"
          value={head}
          onChange={(event) => setHead(event.target.value)}
        />
        <br />
        <label htmlFor="fhs" className="py-2 px-2" >Status: </label>
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name"
          type="text"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        />
        <br />

        <h2>Project Members</h2>
        {members ? (
          members.map((user) => {
            return <ProjectMembers user={user} setMembers={totalMembers} key={user._id} />;
          })
        ) : (
          <div>No members are allocated</div>
        )}
        <br />
        <br />
        <h2>Other Employees</h2>
        {
            users? users.map((user) => {
                if(user) {
                    return <ShowUsersToSelectForProject user = {user} totalEmployee={arrOfEmpID} key={user._id} />
                }
            }) : <div>No users found</div>
        }
        <input type="submit" value="update project" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" />
      </form>
    </div>
  );
}
