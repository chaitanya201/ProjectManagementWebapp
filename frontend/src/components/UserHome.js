import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowAllProjectsOfUser from "./ShowAllProjectsOfUser";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { changeLoginState } from "../store/userLoginSlice";
import { updateUser } from "../store/userObjSlice";
import Navbar from "./Navbar";

export default function UserHome() {
  const [allProjects, setAllProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userObj.userObj);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   // logout function
  //   const logOut = () => {
  //     dispatch(changeLoginState(false))
  //     dispatch(updateUser({}))
  //     navigate("/login")
  // }

  // using useEffect

  useEffect(() => {
    const getData = async () => {
      console.log("user is user", user);
      // const data = new FormData();
      // data.append("_id", user._id);
      const result = await axios.get(
        "http://localhost:5000/user/get-all-projects/?_id=" + user._id
      );
      console.log(result.data.msg);
      console.log("loading setting ", loading);
      setLoading(false);
      if (result.data.status === "success") {
        setAllProjects(result.data.allProjects);
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
      {user.position === "admin" ? (
        <div className="flex" >
          <div className="nav-item">
            <Link
              state={{ status: "Stage1" }}
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
              to="/show-project-status"
            >
              <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
              <span className="ml-2">Stage 1</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link
              state={{ status: "Stage2" }}
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
              to="/show-project-status"
            >
              <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
              <span className="ml-2">Stage 2</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link
              state={{ status: "Stage3" }}
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
              to="/show-project-status"
            >
              <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
              <span className="ml-2">Stage 3</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link
              state={{ status: "completed" }}
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
              to="/show-project-status"
            >
              <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
              <span className="ml-2">Completed</span>
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <h3 className=" flex justify-center text-2xl">All Projects</h3>
      {loading ? (
        <div>Loading.....</div>
      ) : allProjects ? (
        allProjects.map((value) => {
          return <ShowAllProjectsOfUser project={value} key={value._id} />;
        })
      ) : (
        <div>No project is assigned yet</div>
      )}
    </div>
  );
}
