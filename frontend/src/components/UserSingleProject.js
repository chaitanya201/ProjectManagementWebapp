import React from "react";
import RenderProjectMembers from "./RenderProjectMembers";
import { Link } from "react-router-dom";

export default function UserSingleProject({ project }) {
  return (
    <div>
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
        
        <h3 className=" flex justify-center py-4">Project Members</h3>
        {project.members.map((obj) => {
        return <RenderProjectMembers user={obj} key={obj._id} />;
      })}
      
      </div>
      
      
    </div>
    <br />
    </div>
    
  );
}
