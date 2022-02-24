const mongoose = require("mongoose")

const DB = process.env.DATABASE

mongoose.connect(DB,{
    // useNewUrlParser : true,
    useUnifiedTopology : true,
    // useCreateIndex : true,
    // useFindAndModify : false
}).then(() =>{
    console.log(`Successfull connection`)
}).catch((err) => console.log(`${err}+no connection`))