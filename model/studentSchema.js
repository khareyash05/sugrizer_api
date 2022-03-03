const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    firstName  :{
        type : String ,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    class  :{
        type : Date ,
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

const Student = mongoose.model('E-kart',studentSchema)

module.exports = Student