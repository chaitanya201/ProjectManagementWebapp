import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateTasks } from "../store/taskSlice";
import AddTask from "./AddTask";
import Alert from "./Alert";
import Draggable from "react-draggable";

export default function ShowTasks({ task }) {
  const user = useSelector((state) => state.userObj.userObj);
  const dispatch = useDispatch();
  const location = useLocation();
  const { project } = location.state;
  const [clicked, setClicked] = useState(false);
  const [msg, setMsg] = useState(null);
  console.log("task is in show task ", task);

  const onDelete = async () => {
    let val = window.confirm("Are you sure You want to delete the task");
    const data = {
      userID: user._id,
      projectID: project._id,
      taskID: task._id,
      position: user.position,
    };
    if (val) {
      const response = await axios.post(
        "http://localhost:4000/user/delete-tasks",
        data
      );
      console.log("confirm msg", response.data);
      if (response.data.status === "success") {
        console.log(
          "after successful deletion of tasks data is ",
          response.data.tasks
        );
        dispatch(
          updateTasks({ projectID: project._id, tasks: response.data.tasks })
        );
      } else {
        setMsg(response.data.msg);
      }
    }
  };

  let priorityColor = "bg-red-500";
  if (task.priority === "medium") {
    priorityColor = "bg-amber-400";
  } else if (task.priority === "low") {
    priorityColor = "bg-green-600";
  }
  console.log("priority color is ", priorityColor);

  useEffect(() => {
    const getTasks = async () => {
      const url =
        "http://localhost:4000/user/get-tasks/?userID=" +
        user._id +
        "&projectID=" +
        project._id +
        "&position=" +
        user.position;
      const response = await axios.get(url);
      if (response.data.status === "success") {
        console.log(" show tasks all tasks are.. ", response.data.tasks);
        dispatch(
          updateTasks({ projectID: project._id, tasks: response.data.tasks })
        );
      } else {
        console.log("all tasks are ", response.data.tasks);
        setMsg(response.data.msg);
      }
    };
    getTasks();
  }, []);
  // {task.priority} || task: {task.task} || status:{" "}
  //{task.status}{" "}
  return (
    <div>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-xl space-x-4 ">
        {msg ? <Alert /> : <div></div>}

        <>
          <div>
            <div
              className={`flex space-x-6 uppercase py-3  ${priorityColor} text-white border-gray-50 rounded w-20 justify-center bg `}
            >
              <div>{task.priority}</div>
            </div>

            <div className="flex space-x-2 max-w-sm place-content-start">
              <label htmlFor="label">Task: </label>
              <div>{task.task}</div>
            </div>
          </div>

          {!clicked ? (
            <div className="space-x-4">
              <button
                onClick={() => {
                  setClicked(true);
                }}
              >
                <img
                  src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
                  alt="loading edit icon"
                />
              </button>
              <button onClick={onDelete}>
                <img
                  src="https://img.icons8.com/ios-glyphs/50/000000/filled-trash.png"
                  alt="loading delete icon"
                  height={"30"}
                  width="30"
                />
              </button>
            </div>
          ) : (
            <div> </div>
          )}

          {clicked ? (
            <AddTask
              setClicked={setClicked}
              originalTask={task}
              project={project}
            />
          ) : (
            <div> </div>
          )}
        </>
      </div>
    </div>
  );
}
