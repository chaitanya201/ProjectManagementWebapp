import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { changeLoginState } from "../store/userLoginSlice";
import { updateUser } from "../store/userObjSlice";
import Alert from "./Alert";

export default function UserProfile() {
  const dispatch = useDispatch(); // creating object of dispatch using useDispatch()
  const navigate = useNavigate(); // creating object of navigate using useNavigate()
  const user = useSelector((state) => state.userObj.userObj);
  const currentLoginStatus = useSelector(
    (state) => state.userLoginInfo.isLoggedIn
  );
  console.log("current login status is ", currentLoginStatus);
  const logOut = () => {
    dispatch(changeLoginState(false));
    dispatch(updateUser({}));
    navigate("/login");
  };
  // creating variables to store the personal info of users
  let msg = null;
  const location = useLocation()
  let [name, setName] = useState(user.name);
  let [email, setEmail] = useState(user.email);
  let [mobile, setMobile] = useState(user.mobile);
  const [image, setImage] = useState(user.pic);
  console.log("name is ", name);
  console.log("image is ", image);
  console.log("*****************************");
  console.log("current path is ", location.pathname);
  console.log("-----------------------------+++++++");

  const [alertMsg, setAlertMsg] = useState(null);
  const [alterMsgColor, setAlterMsgColor] = useState("emerald");
  // creating useState hook for file upload

  // creating onchange function for image change
  const onImageChange = (event) => {
    console.log("value of image is ", event.target.value);
    setImage(event.target.files[0]);
  };

  // creating functions for name, email, mobile change
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const ImagePath = "http://localhost:5000/profile-pic/";
  const Image = "http://localhost:5000/profile-pic/" + user.pic;
  // printing image
  console.log("image is .....", image);
  // function for form submit
  const formSubmit = async (event) => {
    event.preventDefault();

    if (name && email && mobile) {
      name = name.trim();
      email = email.trim();
      let data = new FormData();
      data.append("myFile", image);
      data.append("name", name);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("userEmail", user.email);
      const response = await axios.post(
        "http://localhost:5000/user/edit-profile/",
        data
      );
      if (response.data) {
        dispatch(updateUser(response.data.user));
        setAlertMsg("Profile Updated");
        console.log("msg is ", alertMsg);
        console.log("user after updating is ", response.data.user);
        // navigate("/user-home")
      } else {
        setAlertMsg("Failed to update profile");
        setAlterMsgColor("red");
      }
    } else {
      msg = "all the fields are required";
    }
  };

  return (
    <div className="grid justify-items-center">
      <div>
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Edit section
        </h1>
        {alertMsg ? (
          <Alert msg={alertMsg} alertColor={alterMsgColor} />
        ) : (
          <div> </div>
        )}
        <div className="max-w-sm w-full lg:max-w-full lg:flex m-auto  ">
          <br />
          {user.pic ? (
            <div
              className="h-80 lg:h-auto lg:w-80 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style={{ backgroundImage: 'url("' + Image + '")' }}
              title="Woman holding a mug"
            ></div>
          ) : (
            <div>Photo is not uploaded</div>
          )}

          <form onSubmit={formSubmit} method="post">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onNameChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />{" "}
            <br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onEmailChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />{" "}
            <br />
            <input
              type="number"
              name="mobile"
              value={mobile}
              onChange={onMobileChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />{" "}
            <br />
            <input
              type="file"
              alt="select profile image"
              name="profilePic"
              onChange={onImageChange}
            />
            <br />
            <input
              type="submit"
              value="Save Changes"
              className="w-full px-6 py-2 mt-4 text-white bg-pink-600 rounded-lg "
            />
          </form>
        </div>
      </div>
    </div>
  );
}
