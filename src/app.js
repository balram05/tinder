const express = require("express");

const app = express();

const port = 3000;


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

const firstName = "Bale";
const lastName = "Balram"
app.get("/user", (req, res) => {
    res.send(`Firstname:${firstName} Lastname:${lastName}`)
    console.log(`Firstname:${firstName} Lastname:${lastName}`)
})
app.post("/user", (req, res) => {
    // res.send(`Firstname:${firstName} Lastname:${lastName}`)
    console.log("data is send to database")
})
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
app.get(/^ab*cd/, (req, res) => {

    res.send("testing mutiple routing operators")
})
//
app.get(/.*fly$/, (req, res) => {

    res.send("testing mutiple routing operators")
})

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

app.use("/middle", (req, res, next) => {
    console.log("in the firt route handler")
    res.send("checking 1st respones")
    next()
}
    , (req, res) => {
        console.log("in the second route handler")
        res.send("checking 2st respones")

    }
)

// app.use((req,res)=>{
//     res.send("hello form the server")
// // console.log("hello")
// })

app.listen(port, () => {
    console.log("connted to the sever successfully")
})






