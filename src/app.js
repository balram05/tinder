const express = require("express");

// const {adminAuth} = require("./middleware/auth") 

const  connectDB =require("./config/database")

const userSchema = require("./models/user")

const app = express();

const port = 3000;

//creating the authication for the admin

// const adminAuth = ("/admin",(res, req, next) => {
//     const token = "abc"
//     const authToken = token === "abc";
//     if (!authToken) {
//         res.status(401).send("unauthorized")
//     }
//     else {
//         next()
//     }
// })

//inside of define the auth as above, 
//we can also use it for the different file ./middleware/auth.js
// app.use("/admin", adminAuth)

// app.use("/test",(req,res)=>{
//     res.send("hello for the route test")
// })
// app.use("/dashboard",(req,res)=>{
//     res.send("hello for the route dashboard")
// })
// app.use("/home",(req,res)=>{
//     res.send("hello for the route home")
// })

// app.use((req,res)=>{
//     res.send("hello for the server")
// })

// const firstName = "Bale";
// const lastName = "Balram"
// app.get("/user", (req, res) => {
//     res.send(`Firstname:${firstName} Lastname:${lastName}`)
//     console.log(`Firstname:${firstName} Lastname:${lastName}`)
// })
// app.post("/user", (req, res) => {
// res.send(`Firstname:${firstName} Lastname:${lastName}`)
//     console.log("data is send to database")
// })
// where b is optional 
// app.get(/^\/ab?c$/,(req,res)=>{

//     res.send("testing mutiple routing operators")
// })

// where we need to write the as many b's as possible
// app.get(/^\/ab+c/,(req,res)=>{

//     res.send("testing mutiple routing operators")
// })



// 
// in the regex if we use the * this can use any string 
// app.get(/^ab*cd/, (req, res) => {

//     res.send("testing mutiple routing operators")
// })
// //
// app.get(/.*fly$/, (req, res) => {

//     res.send("testing mutiple routing operators")
// })

// this is the example for the query parames
// app.use("/abc",(req,res)=>{
//     console.log(req.query)
//     res.send("testing")
// })


// this is the example for the path params
// app.use("/abc/:userid/:name",(req,res)=>{
//     console.log(req.params)
//     res.send("testing")
// })

//routes for the admin
// app.get("/admin/getdata",(req,res)=>{
//     res.send("getting all the data for the admin")
// })

// app.get("/admin/deletedata",(req,res)=>{
//     res.send("delete all the data for the admin")
// })


// app.use("/middle", (req, res, next) => {
//     console.log("in the firt route handler")
//     res.send("checking 1st respones")
//     next()
// }
//     , (req, res) => {
//         console.log("in the second route handler")
//         res.send("checking 2st respones")

//     }
// )

// app.use((req,res)=>{
//     res.send("hello form the server")
// // console.log("hello")
// })





// error handling
// app.get("/getuser", (req, res) => {
    
//     throw new Error("new error")
//     res.send("getting the user data sucessfully")
// })
// app.use("/", (err,req, res,next) => {
//     if (err) {
//         res.status(500).send("get unexpected error")
//     }
// })
app.post("/signup",async(req,res)=>{
    const user = new userSchema({
        firstName:"Bale",
        lastName:"Balram",
        age:25,
        email:"balram@gmail.com"
    }) 
    try{
 await user.save()
    res.send("user add successfully")  
    }
    catch(err){
        res.status(400).send("error while careting new user")
    }
})

connectDB().then(()=>{
    console.log("database is connected successfully")
    app.listen(port, ()=> {
    console.log("connted to the sever successfully")
})
}).catch(err =>{
console.log("database is not connected",err)
})





// 



