const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        default:null,
        ref: "Projects",
        
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        default:null,
        ref: "UserData",
        
    },
    // tasks: {tasks : [...preTasks]}
    // tasks : { tasks : {
    //     type: [{
    //         priority : String,
    //         status : String,
    //         task: String
    //     }]
        
    // }}

    tasks : [{
        task: {
            type : String,
            required: true,
            trim : true
        },
        priority: {
            type : String,
            required: true,
            trim : true
        },
        status : {
            type : String,
            required: true,
            trim : true
        }
    }]
})

const taskModel = new mongoose.model("tasksModel", taskSchema)

module.exports = taskModel