const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    fName :{
        type : String ,
        required : true
    },
    lName : {
        type : String,
        required : true
    },
    classe :{
        type : String ,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    }
})

const Student = mongoose.model('teachers',studentSchema)

module.exports = Student