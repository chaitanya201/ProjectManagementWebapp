import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShowAllEmployee from "./ShowAllEmployee";
import { useSelector, useDispatch } from "react-redux";
import Alert from "./Alert";
export default function AssignProjects() {
  // creating state variables
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [projectHead, setProjectHead] = useState("");
  const user = useSelector((state) => state.userObj.userObj);
  // creating onchange events

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onDescChange = (event) => {
    setDesc(event.target.value);
  };
  const onProjectHeadChange = (event) => {
    setProjectHead(event.target.value);
  };
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // using useEffect react hook
  // this hook runs before even react component renders
  useEffect(() => {
    axios.get("http://localhost:5000/user/getUsers").then((result) => {
      console.log("this method is called");
      setAllUsers(result.data.users);
    });
  }, []);
  console.log("all fetched usrs", allUsers);
  // using this function i am collecting all the selected users from the child component(ShowAllEmployee)
  const getSelectedUsers = (selectedUsersFromChildComponent) => {
    setSelectedUsers(selectedUsersFromChildComponent);
  };

  // return selected users
  const returnSelectedUsers = () => {
    return selectedUsers;
  };

  const [alertMsg, setAlertMsg] = useState(null);
  let alterMsgColor = "red";
  // on form submit
  const onFormSubmit = async (event) => {
    event.preventDefault();
    // in arr i am filtering all invalid _id like undefined which comes from frontend
    console.log("length ", selectedUsers.length);

    let arr = [];
    for (let index = 0; index < selectedUsers.length; index++) {
      if (selectedUsers[index]) {
        arr.push(selectedUsers[index]);
      }
    }
    if (arr.length <= 0) {
      setAlertMsg("Select at least one employee for project");
      return;
    }

    console.log("final list of all selected users ", arr);
    console.log("list of all selected  ", selectedUsers);
    const project = {
      title,
      desc,
      projectHead,
      allUsers: arr,
      userEmail: user.email,
    };
    const response = await axios.post(
      "http://localhost:5000/user/add-project",
      project
    );
    if (response) {
      if (response.data.status === "success") {
        alterMsgColor = "emerald";
        alert("success");
        setAlertMsg(response.data.msg);
        console.log("success");
      } else {
        setAlertMsg(response.data.msg);
        alert(response.data.msg);
      }
    } else {
      alert("failed");
      console.log("failed");
      setAlertMsg("Wrong");
    }
  };

  return (
    <div className="grid justify-items-center">
      <h3>Create Project</h3>
      {alertMsg ? (
        <Alert msg={alertMsg} alertColor={alterMsgColor} />
      ) : (
        <div> </div>
      )}
      <br />
      <form method="post" onSubmit={onFormSubmit}>
        <label htmlFor="title">Project Title: </label>
        <input
          type="text"
          className="
        form-control
        block
        w-64
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          name="title"
          value={title}
          onChange={onTitleChange}
        />
        <br />
        <label htmlFor="desc">Project Description: </label>
        <input
          type="text"
          name="desc"
          className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          value={desc}
          onChange={onDescChange}
        />
        <br />
        <label htmlFor="desc">Project Head: </label>
        <input
          className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          type="text"
          name="projectHead"
          value={projectHead}
          onChange={onProjectHeadChange}
        />
        {/* here in map function "return" is necessary. without return it will not work */}
        <div className="grid justify-items-center">
          <label htmlFor="all">All Employees</label>
          {allUsers ? (
            allUsers.map(function (value, index) {
              return (
                <ShowAllEmployee
                  user={value}
                  collectUsers={getSelectedUsers}
                  useCollectedUsers={returnSelectedUsers}
                />
              );
            })
          ) : (
            <div>No data found</div>
          )}
          <input
            type="submit"
            value="add project"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          />
        </div>
      </form>
      <br />
    </div>
  );
}
