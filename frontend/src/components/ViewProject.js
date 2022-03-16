import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserSingleProject from "./UserSingleProject";

export default function ViewProject() {
  const user = useSelector((state) => state.userObj.userObj);
  const location = useLocation();
  const { project } = location.state;
  console.log("location state", location.state);
  return (
    <div>
      <div>
        <UserSingleProject project={project} setTaskAdded={""} />

      </div>
{/* *************************************** */}
    </div>
  );
}
