import React from 'react'
import { useState } from 'react';
export default function ShowUsersToSelectForProject({user, totalEmployee}) {
    const [checked, setChecked] = useState(false);
    if(checked) {
        if(!totalEmployee.includes(user._id)) {
            totalEmployee.push(user._id)
        }
    } else {
        if(totalEmployee.includes(user._id)) {
            let index = totalEmployee.indexOf(user._id)
            delete totalEmployee[index]
        }
    }
  return (
      <div>
    <div className='flex space-x-4'>
        {
            user.pic ? 
            <img src={"http://localhost:5000/profile-pic/" + user.pic} alt="" height={"60"} width={"60"} /> :
            <div>No image</div>
        }
        <div> {user.name} </div>
        <div>{user.email} </div>
        <input type="checkbox" checked={checked}  value={checked} onChange={() => {
            setChecked(!checked)
        }} />
        
    </div>
    <hr />
    <br />
    </div>
  )
}
