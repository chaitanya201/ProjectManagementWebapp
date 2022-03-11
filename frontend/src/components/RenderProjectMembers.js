import React from 'react'

export default function RenderProjectMembers({user}) {
  return (
    <div className='flex px-2 py-2'>
      {
        user.pic ? <img src={"http://localhost:5000/profile-pic/"+ user.pic} alt="" height="60" width="60" className='px-1 ' /> : 
        <div>image is not uploaded</div>
      }
      <div className='flex justify-between space-x-4 '>
        <div>
          {user.name}
        </div>
        <div>
          {user.email}
        </div>
      </div>
    </div>
  )
}
