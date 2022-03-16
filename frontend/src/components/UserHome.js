import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowAllProjectsOfUser from "./ShowAllProjectsOfUser";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
export default function UserHome() {
  const [allProjects, setAllProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userObj.userObj);
  const [taskAdded, setTaskAdded] = useState(true);
  const location = useLocation()
  //   // logout function
  //   const logOut = () => {
  //     dispatch(changeLoginState(false))
  //     dispatch(updateUser({}))
  //     navigate("/login")
  // }

  // using useEffect

  console.log("******************************");
  console.log("current path is ", location.pathname);
  console.log("******************************");

  useEffect(() => {
    console.log("this is user home");
    const getData = async () => {
      console.log("user is user", user);
      // const data = new FormData();
      // data.append("_id", user._id);
      const result = await axios.get(
        "http://localhost:5000/user/get-all-projects/?_id=" + user._id + "&permission="+ user.position
      );
      console.log(result.data.msg);
      console.log("this is user home");
      console.log("loading setting ", loading);
      setLoading(false);
      if (result.data.status === "success") {
        setAllProjects(result.data.allProjects);
        setTaskAdded(false)
        console.log("data of projects fetched successfully");
        console.log(result.data);
      } else {
        console.log("failed to get data of projects");
      }
    };

    getData();
  }, [loading, user]);
  // alert(user)
  console.log("all projects", allProjects);
  return (
    <div>
      
      <h3 className=" flex justify-center text-2xl">All Projects</h3>
      {loading ? (
        <div>Loading.....</div>
      ) : allProjects ? (
        allProjects.map((value) => {
          return (
            <div key={value._id}>
              <ShowAllProjectsOfUser project={value} setTaskAdded={setTaskAdded} />
              <br />
              
            </div>
          )
        })
      ) : (
        <div>No project is assigned yet</div>
      )}
    </div>
  );
}
