const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    title  :{
        type : String ,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    dueDate  :{
        type : Date ,
        required : true
    },
    submit :{
        type : Boolean,
        default : false
    },
    response :{
        type : String,
        default : ""
    }
})

const Teacher = mongoose.model('E-kart',teacherSchema)

module.exports = Teacher