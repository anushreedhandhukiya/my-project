const mongoose = require("mongoose")

const connected = async ()=>{
    await mongoose.connect("mongodb+srv://anushreecd2000:e_com@cluster0.6vimfjg.mongodb.net/?retryWrites=true&w=majority")
    console.log("database connected");
}

module.exports=connected