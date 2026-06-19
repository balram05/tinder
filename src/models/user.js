const mongoose =require("mongoose");

// creating the new schema
const userSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
   age:Number,
   email:{
    type:String,
    require:true
   }
    
})
// creating the new model 
// alway model name shouls start with capital letter
module.exports = mongoose.model("User",userSchema)