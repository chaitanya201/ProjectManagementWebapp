import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './taskSlice'
import userSlice from './userLoginSlice'
import userObjSlice from './userObjSlice'
export  default configureStore( {

    reducer: {
        userLoginInfo: userSlice,
        userObj : userObjSlice,
        allTasks : taskSlice
    }
}
    
)