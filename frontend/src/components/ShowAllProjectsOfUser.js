import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function ShowAllProjectsOfUser({ project }) {
  return (
    <div className="flex justify-center">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h5 className="text-white text-xl leading-tight font-medium mb-2 bg-purple-400">
          {project.name} || {project.head}
          <hr />
        </h5>
        <p className="text-gray-700 text-base mb-4">{project.desc}</p>

        <h4 className=" flex justify-center inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Status: {project.status}
        </h4>
      </div>
      <br />
      <br />
    </div>
  );
}
