const mongoose =require("mongoose");
const validator = require("validator")

// creating the new schema
const userSchema = mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        maxLength:50
    },
    lastName:{
        type:String,
        maxLength:50
    },
   age:{
    type:Number,
    min:18
    },
   email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("invaild email address")
        }
    }
  
   },
   gender:{
    type:String,

      validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("gender data is not valid")
        }
    },

    required:true
    // enum:{
    //     values:["male","female","others"],
    //     message:"{VALUE} is not valid gender"
    // }
   },
   about:{
    type:String,
    default:"this the about of the person"
   },
   skills:{
    type:[String]
   },
   profileURL:{
    type:String,
    validate(value){
        if(!validator.isURL(value)){
            throw new Error("is not a vaild URL" + value)
        }
    }
   },
   password:{
    type:String,
    trim:true,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("enter strong password " + value)
        }
    }
   }
    
},{timestamps:true})
// creating the new model 
// alway model name shouls start with capital letter
module.exports = mongoose.model("User",userSchema)


