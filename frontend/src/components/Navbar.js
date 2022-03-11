import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState } from "../store/userLoginSlice";
import { updateUser } from "../store/userObjSlice";

export default function Navbar({ fixed }) {
  const user = useSelector((state) => state.userObj.userObj);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(changeLoginState(false));
    dispatch(updateUser({}));
    navigate("/login");
  };

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-teal-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              
            >
            {user.name}
            </div>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid  rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/user-profile"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Edit Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/user-home"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Home</span>
                </Link>
              </li>
              {user.position === "admin" ? (
                <div className="flex">
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="/create-project"
                    >
                      <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                      <span className="ml-2">Create Project</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="/update-project"
                    >
                      <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                      <span className="ml-2">Update Project</span>
                    </Link>
                  </li>
                  
                </div>
              ) : (
                <div></div>
              )}
              <li className="nav-item">
                <button className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2" onClick={logOut}>
                    Logout
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
