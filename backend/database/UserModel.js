const mongoose = require("mongoose")
const Projects = require('./ProjectModel')
// connecting MongoDB 
mongoose.connect('mongodb://localhost:27017/UsersProfileData', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, ()=>{
    console.log("MongoDB connected..")
})

// defining schema
const userSchema = new mongoose.Schema({
    name: String,
    position: {type: String, default: "employee"},
    email: {type: String, unique: true},
    mobile: {type:String, unique:true},
    password: String,
    pic: {type: String, default: ""}
    
})

const userModel = new mongoose.model("UserData", userSchema)



module.exports = userModel;