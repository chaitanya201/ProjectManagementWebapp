const express = require("express")
const router = express.Router()
const projectModel = require('../database/ProjectModel')

// adding projects 
router.post("/addProject", (req, res) => {
    projectModel.findOne({name: req.body.name}, (err, project) => {
        if (project) {
            console.log("project already exists ", project);
            res.send({msg:'project name already exists, user another name and try again ', project: null})
        } else {
            const newProject = new projectModel({
                name : req.body.name,
                desc : req.body.desc
                
            })
            newProject.save((err) => {
                if(err) {
                    console.log("error has occurred while saving this object ", newProject);
                    res.send({'msg':'error', project:null})
                } else {
                    console.log("object has saved successfully");
                    res.send({'msg': 'success', project: newProject})
                }
            })
        }
    })
})

// updating status of project
// update returns object like this:
// {
//     acknowledged: true,
//     modifiedCount: 1,
//     upsertedId: null,
//     upsertedCount: 0,
//     matchedCount: 1
//   }


router.post('/update-status', (req, res) => {
    projectModel.update({name:req.body.name},{$set: {status: req.body.status}},{new:true}).then((project) => {
        if(project.acknowledged){
            console.log("success");
            res.send({"msg":success})
        } else {
            console.log("failed to save ");
            res.send({"msg":"failed to save"})
        }
    })
})

module.exports = router