import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ShowAllProjectsOfUser({ project, setTaskAdded }) {
  const user = useSelector((state) => state.userObj.userObj);

  return (
    <div className="flex justify-center">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <div className="flex space-x-4 ">
          <h5 className="text-white text-xl leading-tight font-medium mb-2 bg-purple-400 px-4">
            {project.name}
          </h5>
          <h5 className="text-white text-xl leading-tight font-medium mb-2 bg-amber-300 px-4">
            {project.head}
          </h5>
        </div>
        <p className="text-gray-700 text-base mb-4">{project.desc}</p>

        <h4 className=" flex justify-center inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Status: {project.status}
        </h4>
        <br />
        {
          user.position === "employee" ? <Link state={{project: project}} to="/show-tasks" className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          <h4>
            show tasks
          </h4>
        </Link> : <div></div>
        }
        
      </div>
     
    </div>
  );
}
