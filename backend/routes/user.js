const express = require("express");
const router = express.Router();
const userModel = require("../database/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
// this library helps in dealing with date and time
const dateTime = require("node-datetime");
const projectModel = require("../database/ProjectModel");
// creating object for date and time
const dt = dateTime.create();
const formatted = dt.format("Y-m-d");

// creating storage object to store images through multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("in multer ....................");
    console.log("multer file is ", file);
    cb(null, "D:/Node  JS Projects/Project Management WebApp/backend/public");
  },
  filename: function (req, file, cb) {
    cb(null, formatted + "_" + file.originalname);
  },
});

//
const upload = multer({ storage: storage });

// registration with async await
const register = async (req, res) => {
  console.log("checking user credentials for registration");
  const userEmail = await userModel.findOne({ email: req.body.email });
  if (!userEmail) {
    const userMobile = await userModel.findOne({ mobile: req.body.mobile });
    if (!userMobile) {
      const salt = await bcrypt.genSalt(18);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashPassword,
      });

      newUser.save((err) => {
        if (err) {
          console.log("error*********during saving****************", err);
          return res.send({ msg: "error", user: null, status: "failed" });
        } else {
          console.log("success!!!!!!!!!!!!!!!!!!!!");
          console.log("new email", newUser.email);
          return res.send({ msg: "success", user: newUser, status: "success" });
        }
      });
    } else {
      res.send({ status: "failed", msg: "mobile already exists", user: null });
    }
  } else {
    res.send({ status: "failed", msg: "Email already exists", user: null });
  }
};

// registration part without async await
// router.post("/register", (req, res) => {
//   console.log("checking email  ", req.body.email);
//   try {
//     userModel.findOne(
//       { email: req.body.email, mobile: req.body.mobile },
//       (err, user) => {
//         console.log("email ", req.body.email);
//         if (user) {
//           console.log("user already exists ", user);
//           return res.send({ msg: "failed", user: null });
//         } else {
//           bcrypt.genSalt(18).then((salt) => {
//             bcrypt.hash(req.body.password, salt).then((hashPassword) => {
//               console.log("new user");
//               const userr = {
//                 name: req.body.name,
//                 email: req.body.email,
//                 mobile: req.body.mobile,
//                 password: hashPassword,
//               };
//               const newUser = new userModel(userr);
//               console.log(
//                 "name : ",
//                 req.body.name,
//                 " email ",
//                 req.body.email,
//                 "mobile ",
//                 "mobile",
//                 req.body.mobile
//               );
//               newUser.save((err) => {
//                 if (err) {
//                   console.log(
//                     "error*********during saving****************",
//                     err
//                   );
//                   return res.send({ msg: "error", user: null });
//                 } else {
//                   console.log("success!!!!!!!!!!!!!!!!!!!!");
//                   console.log("new email", newUser.email);
//                   return res.send({ msg: "success", user: newUser });
//                 }
//               });
//             });
//           });
//         }
//       }
//     );
//   } catch (error) {
//     return res.send({ status: "failed", msg: "error while finding user" });
//   }
// });

// router.post("/login", async (req, res) => {
//   console.log("checking user info for login");
//   let response = await userModel.findOne({ email: req.body.email });
//   console.log(response, " this is response");
//   return res.send({ msg: "success to login", user: response })
// });

// login part
// this function is using async await
const userLogin = async (req, res) => {
  console.log("checking user credentials for login");
  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    const isTrue = await bcrypt.compare(req.body.password, user.password);
    if (isTrue) {
      console.log("user is valid, now logging in");
      res.send({ status: "success", msg: "login successful", user: user });
    } else {
      console.log("something is not correct please re-enter u r details");
      res.send({ status: "failed", msg: "unable to login", user: {} });
    }
  } else {
    console.log("something is not correct please re-enter u r details");
    res.send({ status: "failed", msg: "unable to login", user: {} });
  }
};

// this is without using async await and its working
// router.post("/login", (req, res) => {
//   console.log("checking user info for login");
//   userModel.findOne({ email: req.body.email }).then((user) => {
//     console.log("email is ", req.body.email, " password : ", req.body.password);
//     if (user) {
//       bcrypt.compare(req.body.password, user.password).then((passwordCheck) => {
//         if (passwordCheck) {
//           console.log("user has registered");
//           res.send({ msg: "success", user: user });
//         } else {
//           res.send({ msg: "failed to login", user: null });
//         }
//       });
//     }
//   });
// });

// edit user profile
// findOneAndUpdate() by default returns object as it was before update
// to change this behavior pass an object with new : true ie {new : true}

const editUser = async (req, res) => {
  console.log("in editing profile function");
  console.log("name is  ", req.body.name);
  console.log("email is ", req.body.email);
  console.log("mobile is ", req.body.mobile);
  console.log("req file is ", req.body.myFile);

  const result = await userModel.findOneAndUpdate(
    { email: req.body.userEmail },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        pic: req.file
          ? req.file.filename
          : req.body.myFile
          ? req.body.myFile
          : null,
      },
    },
    { new: true }
  );
  if (result) {
    res.send({ msg: "updating is successful", user: result });
    console.log("changes saved");
  } else {
    res.send({ msg: "error has occurred", user: result });
    console.log("error while saving changes", result);
  }
};

// get all users function
const getUsers = async (req, res) => {
  console.log("getting users ", req.body);
  // console.log("getting user ",req.body._id);
  const users = await userModel.find();
  if (users) {
    console.log("all users ", users);
    res.send({ status: "success", users: users });
  } else {
    console.log("some error has occurred while getting users");
    res.send({ status: "failed", users: null });
  }
};

// get all the projects of particular user
const getProject = async (req, res) => {
  console.log("id of user is ", req.query._id);
  console.log("email of user is ", req.body);
  if (!req.query.stage && req.query._id) {
    const allProjects = await projectModel.find({ members: req.query._id });
    console.log("all projects", allProjects);
    if (allProjects.length >= 1) {
      res.send({
        status: "success",
        msg: "all projects are found successfully",
        allProjects: allProjects,
      });
    } else {
      res.send({
        msg: "could not get projects",
        status: "failed",
        allProjects: null,
      });
    }
  } else if (req.query.stage && req.query._id) {
    console.log("in req.query.stage");
    console.log("stage is ", req.query.stage);
    console.log("id is ", req.query._id);
    const allProjects = await projectModel.find({ members: req.query._id, status:req.query.stage });
    console.log("all projects", allProjects);
    if (allProjects.length >= 1) {
      res.send({
        status: "success",
        msg: "all projects are found successfully",
        allProjects: allProjects,
      });
    } else {
      res.send({
        msg: "could not get projects",
        status: "failed",
        allProjects: null,
      });
    }
  } else {
    res.send({"status":"failed","msg":"invalid query", allProjects:null})
  }
};

// updating projects
// visit  https://www.geeksforgeeks.org/mongoose-populate-method/ to get more knowledge about populate method
// in populate("field") give value of field as "members" because i have stored ids under that field name in projectModel Schema
// when i access document of projectModel i get all the info about project but as for members i get only ids
// so if i want to get all the info about both project and members then i have to use "populate method"
// populate takes one parameter that which field u want to populate.
// in my case in projectModel in members field i want all the user info with that id instead of only their id.
// so my parameter for populate will be "members"
// Note: populate methods parameter is not model(schema) name..... it is field name

const getProjectToUpdate = async (req, res) => {
  console.log("query is ", req.query.status);
  if (req.query.status) {
    console.log("in query");
    const allProjects = await projectModel
      .find({ status: req.query.status })
      .populate("members");
    console.log("all projects are ", allProjects);
    if (allProjects) {
      return res.send({
        allProjects,
        status: "success",
        msg: "all projects are collected successfully",
        query: "query",
      });
    } else {
      return res.send({
        status: "failed",
        msg: "failed to get projects",
        allProjects,
      });
    }
  } else {
    const projects = await projectModel.find().populate("members");
    console.log("projects are ", projects);
    if (projects) {
      console.log("true");
      return res.send({
        allProjects: projects,
        status: "success",
        msg: "all projects are collected successfully",
      });
    } else {
      res.send({
        status: "failed",
        msg: "failed to get projects",
        allProjects: projects,
      });
    }
  }
};

const updateProjectData = async (req, res) => {
  console.log("updating project data with id ", req.body._id);
  const project = await projectModel.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        name: req.body.name,
        desc: req.body.desc,
        head: req.body.head,
        status: req.body.status,
        members: req.body.members,
      },
    },
    { new: true }
  );
  console.log("project data is ", project);
  if (project) {
    console.log("project data updated successfully");

    return res.send({
      status: "success",
      msg: "project updated successfully",
      project: project,
    });
  }
  console.log("project data failed to update");

  return res.send({
    status: "failed",
    msg: "failed to update the project",
    project: null,
  });
};

// adding projects
const addProject = async (req, res) => {
  console.log("adding the project");
  const response = await userModel.findOne({ email: req.body.userEmail });
  if (response) {
    if (response.position === "admin") {
      const projectObj = new projectModel({
        name: req.body.title,
        desc: req.body.desc,
        head: req.body.projectHead,
        members: req.body.allUsers,
      });

      const projectSaved = await projectObj.save();

      if (projectSaved) {
        console.log("project saved");
        res.send({
          status: "success",
          msg: "project saved successfully",
          project: projectSaved,
        });
      } else {
        console.log("failed to save project");
        res.send({
          status: "failed",
          msg: "error while saving",
          project: null,
        });
      }
    } else {
      console.log("again failed to save");
      res.send({
        status: "failed",
        msg: "you dont have the permission",
        project: null,
      });
    }
  } else {
    console.log("something is wrong ");
    res.send({ status: "failed", msg: "user is not valid", project: null });
  }
};

//  all routes

// 1. edit profile
router.post("/edit-profile", upload.single("myFile"), editUser);

// 2. login
router.post("/login", userLogin);

// 3. get all users
router.get("/getUsers", getUsers);

// 4. create project
router.post("/add-project", addProject);

// 5. get project
router.get("/get-all-projects", getProject);

// 6. get project to update
router.get("/get-projects-for-updation", getProjectToUpdate);

// 7. update project
router.post("/update-project", updateProjectData);

// 8. register
router.post("/register", register);
module.exports = router;
