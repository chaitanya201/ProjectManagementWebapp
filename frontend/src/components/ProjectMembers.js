import React, {useState} from 'react'

export default function ProjectMembers({user, setMembers}) {
    const [checked, setChecked] = useState(true);

    if(checked) {
        if(!setMembers.includes(user._id)) {
            setMembers.push(user._id)
        }
    } else {
        if(setMembers.includes(user._id)) {
            const index = setMembers.indexOf(user._id)
            delete setMembers[index]
        }
    }
    console.log("set member is ........", setMembers);
  return (
    <div >
        <div className='flex space-x-4'>
            {
                user.pic ? <img src={"http://localhost:5000/profile-pic/" + user.pic} alt="" height={"59"} width={"60"} /> 
                : <div>No image uploaded</div>
            }
            <div>{user.name} </div>
            <div>{user.email} </div>
            <div>
            <input type="checkbox" value={checked} checked={checked} onChange={(event) => {
                setChecked(!checked)
            }}/>
            </div>
        </div>
        <hr />
        <br />
    </div>
  )
}
