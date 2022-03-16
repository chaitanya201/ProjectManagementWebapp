import {createSlice} from '@reduxjs/toolkit';
export const taskSlice = createSlice({
    name : "all user tasks",
    initialState: {
        allTasks : []
    },
    reducers : {
        updateTasks : (state,action) => {
            if(state.allTasks) {
                for (let index = 0; index < state.allTasks.length; index++) {
                    if(state.allTasks[index].projectID === action.payload.projectID) {
                        state.allTasks[index] = {...action.payload}
                        return
                    }
                }

                state.allTasks.push({...action.payload})
            } else {
                state.allTasks = [{...action.payload}]
            }
        }
    }
})

export const {updateTasks} = taskSlice.actions
export default taskSlice.reducer