const express = require("express")
const app = express()
const dotenv= require("dotenv")
const mongoose = require("mongoose")

dotenv.config({path : 'config.env'})

require("./db/conn")
const Assignment = require("./model/assignmentSchema")
const Student = require("./model/studentSchema")
const Teacher = require("./model/teacherSchema")

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/student", async (req,res)=>{
    res.render("studentoptions")
})
app.get("/teacher", async (req,res)=>{
    res.render("teacheroptions")
})

app.get("/studentlogin", async (req,res)=>{
    res.render("studentlogin")
})

app.post("/studentlogin", async (req,res)=>{
    const {email,password} = req.body
    const student = await Student.findOne({email,password})
    if(!student){
        return res.status(400).json({"msg" : "Invalid Credentials"})
    }
    res.redirect("/studenthome")
})

app.get("/studentregister", async (req,res)=>{
    res.render("studentregister")
})

app.post("/studentregister", async (req,res)=>{
    const {fName,lName,classe,email,password} = req.body
    console.log(fName,lName,classe,email,password);
    const student = await Student.findOne({email})
    if(student){
        res.redirect("/studenthome")
    }else{
        const newStudent= new Student({fName,lName,classe,email,password})
        await newStudent.save()
        res.redirect("/studenthome")
    }
})

app.get("/teacherlogin", async (req,res)=>{
    res.render("teacherlogin")
})

app.post("/teacherlogin", async (req,res)=>{
    const {email,password} = req.body
    const teacher = await Teacher.findOne({email,password})
    if(!teacher){
        return res.status(400).json({"msg" : "Invalid Credentials"})
    }
    res.redirect("/teacherhome")
})

app.get("/teacherregister", async (req,res)=>{
    res.render("teacherregister")
})

app.post("/teacherregister", async (req,res)=>{
    const {fName,lName,classe,email,password} = req.body
    const student = await Teacher.findOne({email})
    if(student){
        res.redirect("/teacherhome")
    }else{
        const newTeacher= new Teacher({fName,lName,classe,email,password})
        await newTeacher.save()
        res.redirect("/teacherhome")
    }
})

app.get("/teacherhome", (req, res) => {
    res.render("teacher")
})

app.post("/teacherhome", async (req, res) => {
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

app.get("/studenthome",async (req,res)=>{
    const assignments = await Assignment.find()
    res.render("student",{data:assignments})
})

app.post("/studenthome", async (req, res) => {
    const {answer,id} = req.body
    if(!answer){
        return res.status(400).json({msg : "Please enter your answer"})
    }
    const updateAssignment = await Assignment.findByIdAndUpdate(id,{submit : true,response : answer})
    console.log(updateAssignment);
    return res.status(200).json({msg : "Answer submitted"})
})

app.get("/responses", async (req, res) => {
    const responses = await Assignment.find()
    res.render("responses",{responses})
})

app.post("/responses",async (req,res)=>{    
})

app.listen(3000)