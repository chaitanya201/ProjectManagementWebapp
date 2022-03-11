import React, { useState } from "react";

export default function ShowAllEmployee({
  user,
  collectUsers,
  useCollectedUsers,
}) {
  const ImagePath = "http://localhost:5000/profile-pic/";
  // console.log("in child");
  // const [useCollectedUsers, setuseCollectedUsers] = useState([]);

  // here collectUsers is a function sent from parent to child
  // i am updating this function with current selected list of users.
  // and sending back this list to parent component.

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
    console.log("checked value is ", checked);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  };
  console.log("final value of check is ", checked);
  let copy = useCollectedUsers();
  if (checked) {
    copy = [...copy];
    if (!copy.includes(user._id)) {
      copy.push(user._id);
      console.log("user added ", copy);

      collectUsers(copy);
    }
  } else {
    if (copy.includes(user._id)) {
      delete copy[copy.indexOf(user._id)];
      // console.log("user deleted ", copy);
      collectUsers(copy);
    }
  }
  console.log("final array ", useCollectedUsers());
  return (
    <div >
      <div>
        {user.pic ? (
          <img
            src={ImagePath + user.pic}
            alt="loading"
            height="50"
            width="50"
          />
        ) : (
          <div>not uploaded</div>
        )}
        <input type="text" value={user.name} readOnly />
        <input type="text" value={user.email} readOnly />
        <input type="checkbox" checked={checked} onChange={handleChange} />
      </div>
      <hr />
      <br />
    </div>
  );
}
