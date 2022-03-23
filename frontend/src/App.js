import Register from "./components/Register";
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import Login from "./components/Login";
import Profile from "./components/UserProfile";
import PageNotFound from "./components/PageNotFound";
import { useSelector } from "react-redux";
import UserHome from "./components/UserHome";
import AssignProjects from "./components/AssignProjects";
import UpdateProjectStatus from "./components/UpdateProjectStatus";
import ShowSingleProject from "./components/ShowSingleProject";
import Navbar from "./components/Navbar";
import ShowProjectStatus from "./components/ShowProjectStatus";
import UserProjectStatus from "./components/UserProjectStatus";
import ViewProject from "./components/ViewProject";

function App() {
  const loginStatus = useSelector((state) => state.userLoginInfo.isLoggedIn)
  // getting current path in the url 
  // to check whether path is login or register
  // const currentPathName = window.location.href;
  return (
    <BrowserRouter>
    {/* {
      currentPathName === "http://localhost:3000/login" || currentPathName === "http://localhost:3000/register" ?
      <div></div> :
      <Navbar />
    } */}
      {
        loginStatus ? <Navbar /> : <div></div>
      }
      <Routes>
        <Route path="/register" element={<Register />} > </Route>
        <Route path="login" element={<Login />} ></Route>
        {/* <Route path="/profile" element={<Profile />} ></Route> */}
        { loginStatus ?
          <Route path="/user-home" element={<UserHome />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
        { loginStatus ?
          <Route path="/create-project" element={<AssignProjects />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
        { loginStatus ?
          <Route path="/user-profile" element={<Profile />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
        { loginStatus ?
          <Route path="/update-project" element={<UpdateProjectStatus />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
        { loginStatus ?
          <Route path="/show-single-project" element={<ShowSingleProject />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
        { loginStatus ?
          <Route path="/show-project-status" element={<ShowProjectStatus />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
        { loginStatus ?
          <Route path="/show-user-project-status" element={<UserProjectStatus />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
        { loginStatus ?
          <Route path="/show-tasks" element={<ViewProject />} ></Route> :
          <Route path="/login" element={<Login />} ></Route>
        }
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
