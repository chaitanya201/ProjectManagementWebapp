import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "./Alert";
import { updateTasks } from "../store/taskSlice";

export default function AddTask({ setClicked, project, originalTask }) {
  const [task, setTask] = useState(originalTask ? originalTask.task : "");
  const [status, setStatus] = useState(
    originalTask ? originalTask.status : "progress"
  );
  const user = useSelector((state) => state.userObj.userObj);
  const allTasks = useSelector((state) => state.allTasks.allTasks);

  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(
    originalTask ? originalTask.priority : "high"
  );
  const handleOptionChange = (event) => {
    console.log("changed value", event.target.value);
    setSelectedOption(event.target.value);
  };
  console.log("default option ", selectedOption);
  console.log("default option ", status);
  const options = [
    { label: "High Priority", value: "high", id: "1" },
    { label: "Medium Priority", value: "medium", id: "2" },
    { label: "Low Priority", value: "low", id: "3" },
  ];

  const optionsForProgress = [
    { label: "In progress", value: "progress" },
    { label: "Review", value: "review" },
    { label: "Completed", value: "completed" },
  ];
  console.log("status of task is ", status)
  console.log("priority of task is ", selectedOption)

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (task.length <= 0) {
      return;
    }
    if (allTasks) {
      for (let i = 0; i < allTasks.length; i++) {
        if ((allTasks[i].task === task) && (allTasks[i].status === status) && (allTasks[i].priority === selectedOption)) {
          setMsg("Task already exists");
          return;
        }
      }
    }
    setClicked(false);
    const url = "http://localhost:5000/user/save-tasks";
    const data = {
      userID: user._id,
      projectID: project._id,
      task: task,
      priority: selectedOption,
      position: user.position,
      status: status,
      taskID: originalTask ? originalTask._id : null,
    };
    const response = await axios.post(url, data);
    console.log("response data0 ", response.data.tasks);
    if (response.data.status !== "success") {
      setMsg(response.data.msg);
      // dispatch(updateTasks())
    } else {
      dispatch(
        updateTasks({
          projectID: project._id,
          tasks: response.data.tasks,
        })
      );
      console.log("after updation !!!!1 tasks ", response.data.tasks);
      console.log("response ", response.data);
      console.log("after updation !!!!1 userID ", response.data.userID);
      // console.log(
      //   "add tasks after updation !!!!!1",
      //   response.data.tasks[0].tasks
      // );
    }
  };
  return (
    <div>
      <h3>Create task</h3>
      {msg ? <Alert msg={msg} alertColor={"red"} /> : <div></div>}
      <form onSubmit={onFormSubmit} method="post">
        <div className="flex px-3 space-x-48 place-content-center">
          <div className="place-content-start">
            <select onChange={handleOptionChange} required>
              {options.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div >
            <select
              onChange={(event) => {
                setStatus(event.target.value);
              }}
              required
            >
              {optionsForProgress.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          name="task"
          value={task}
          cols="30"
          rows="10"
          onChange={(event) => {
            setTask(event.target.value);
          }}
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
        ></textarea>
        <br />

        <div className="flex  place-content-center space-x-32 ">
          <input
            type="submit"
            value="Add task"
            className="button"
            class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          />

          <button
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {
              setClicked(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
