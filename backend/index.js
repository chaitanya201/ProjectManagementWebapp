const bodyParser = require("body-parser")
const express = require("express")
const cors = require("cors")
const app = express()
const userRoutes = require('./routes/user')
const projectRoutes = require('./routes/projectRoutes')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
const PORT = 5000


// here i am creating static folder

app.use('/profile-pic', express.static('./public'))
// starting server
const server = app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log(`server is running at http://localhost:${PORT}`);
    }
}) 
app.use('/user', userRoutes)

app.use('/project', projectRoutes)