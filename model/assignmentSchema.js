const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema({
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

const Assignment = mongoose.model('E-kart',assignmentSchema)

module.exports = Assignment