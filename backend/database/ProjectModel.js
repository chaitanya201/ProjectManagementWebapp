const mongoose = require("mongoose")

// connecting MongoDB 
// mongoose.connect('mongodb://localhost:27017/UsersProfileData', {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// }, ()=>{
//     console.log("MongoDB connected..")
// })

// defining Projects Schema
const projectSchema = new mongoose.Schema({
    name : {type:String, unique:true},
    desc: String,
    head: String,
    status: {type:String, default: "Stage 1"},
    members : [{
        type: mongoose.Schema.Types.ObjectId,
        default:null,
        ref: "UserData"
    }]
})

const projectModel = new mongoose.model("Projects",projectSchema )

// exporting project model
module.exports = projectModel