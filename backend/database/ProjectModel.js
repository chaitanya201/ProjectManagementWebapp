const mongoose = require("mongoose")


// defining Projects Schema
const projectSchema = new mongoose.Schema({
    name : {type:String, unique:true},
    desc: String,
    head: String,
    Stage1Date: Date,
    Stage2Date:Date,
    Stage3Date:Date,
    CompleteDate: Date,
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