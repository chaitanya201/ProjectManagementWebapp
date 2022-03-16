import React, { useState, useEffect } from "react";
import RenderProjectMembers from "./RenderProjectMembers";
import AddTask from "./AddTask";
import ShowTasks from "./ShowTasks";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateTasks } from "../store/taskSlice";
import Alter from "./Alert";
export default function UserSingleProject({ project, setTaskAdded }) {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch(); // creating object of dispatch using useDispatch()
  const [msg, setMsg] = useState(null);
  const allTasks = useSelector((state) => state.allTasks.allTasks);
  const user = useSelector((state) => state.userObj.userObj);
  console.log("all tasks are ...", allTasks);
  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get(
        "http://localhost:5000/user/get-tasks/?userID=" +
          user._id +
          "&position=" +
          user.position +
          "&projectID=" +
          project._id
      );
      if (response.data.status === "success") {
        dispatch(
          updateTasks({
            projectID: project._id,
            tasks: response.data.tasks,
          })
        );
        console.log("in usr single project task is ..", response.data);
      } else {
        setMsg(response.data.msg);
      }
    };
    getTasks();
  }, []);
  return (
    <div className="py-3">
      {msg ? <Alter msg={msg} alertColor={"red"} /> : <div></div>}
      <div className="flex justify-center absolute  top-10% min-w-fit w-1/2 ">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-xl space-x-4 ">
          <div className="flex space-x-4 ">
            <h5 className="text-white text-xl leading-tight font-medium mb-2 bg-purple-400 px-4">
              {project.name}
            </h5>
            <h5 className="text-white text-xl leading-tight font-medium mb-2 bg-amber-300 px-4">
              {project.head}
            </h5>
          </div>
          <div className="max-e-md">
            <p className="text-gray-700 text-base mb-4">{project.desc}</p>

            <h3 className=" flex justify-center py-4">Project Members</h3>
            {project.members.map((obj) => {
              return <RenderProjectMembers user={obj} key={obj._id} />;
            })}
          </div>
          <br />
        </div>
      </div>

      <div className=" absolute  left-2/3 px-2 scroll-py-5 ">
        <h2 className="text-center">All tasks</h2>
        <hr />
        {allTasks ? (
          allTasks.length > 0 ? (
            allTasks.map((task, i) => {
              return (
                <div>
                  {task ? (
                    <div className="absolute left-1/2">
                      <table className="max-w-sm absolute left-1/2 ">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-2 text-xs text-gray-500">
                              In Progress
                            </th>
                            <th className="px-6 py-2 text-xs text-gray-500">
                              Review
                            </th>
                            <th className="px-6 py-2 text-xs text-gray-500">
                              Completed
                            </th>
                          </tr>
                        </thead>
                        <tbody key={i} className="px-2 py-6">
                          {task && task.projectID === project._id ? (
                            task.tasks.map((actualTasks) => {
                              return (
                                <tr className="px-6 py-4 text-sm text-gray-500">
                                  <th className="px-6 py-4 text-sm text-gray-500">
                                    {actualTasks.status === "progress" ? (
                                      <div key={task.projectID}>
                                        <ShowTasks task={actualTasks} />
                                        <br />
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                  </th>
                                  <th className="px-6 py-4 text-sm text-gray-500">
                                    {actualTasks.status === "review" ? (
                                      <div key={task.projectID}>
                                        <ShowTasks task={actualTasks} />
                                        <br />
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                  </th>
                                  <td className="px-6 py-4 text-sm text-gray-500">
                                    {actualTasks.status === "completed" ? (
                                      <div key={task.projectID}>
                                        <ShowTasks task={actualTasks} />
                                        <br />
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <div key={"fgas"}></div>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })
          ) : (
            <div>You don't have any tasks GOOD JOB</div>
          )
        ) : (
          <div></div>
        )}

        {!clicked ? (
          <div className=" text-center ">
            <button
              onClick={() => {
                setClicked(true);
              }}
              className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  "
            >
              <img
                src="https://img.icons8.com/ios/50/000000/add--v1.png"
                alt="loading"
              />
            </button>
          </div>
        ) : (
          <AddTask
            setClicked={setClicked}
            project={project}
            setTaskAdded={setTaskAdded}
          />
        )}
      </div>

      <br />
    </div>
  );
}
