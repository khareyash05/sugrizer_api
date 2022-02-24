const express = require("express")
const app = express()
const dotenv= require("dotenv")
const mongoose = require("mongoose")

dotenv.config({path : 'config.env'})

require("./db/conn")
const Assignment = require("./model/assignmentSchema")

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/teacher", (req, res) => {
    res.render("teacher")
})

app.post("/teacher", async (req, res) => {
    const {title, description, dueDate,submit} = req.body
    console.log(title, description, dueDate,submit)
    if(!title || !description || !dueDate ){
        return res.status(400).json({msg : "Please enter all fields"})
    }
    const newTask = new Assignment({
        title,
        description,
        dueDate
    })
    await newTask.save()
    res.send("New assignment created")
})

app.get("/student",async (req,res)=>{
    const assignments = await Assignment.find()
    res.render("student",{data:assignments})
})

app.post("/student", async (req, res) => {
    const {answer,id} = req.body
    if(!answer){
        return res.status(400).json({msg : "Please enter your answer"})
    }
    const updateAssignment = await Assignment.findByIdAndUpdate(id,{submit : true,response : answer})
    console.log(updateAssignment);
    return res.status(200).json({msg : "Answer submitted"})
})

app.listen(3000)