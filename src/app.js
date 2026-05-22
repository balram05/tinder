const express = require("express");

const app = express();

const port =3000;


app.use("/test",(req,res)=>{
    res.send("hello for the route test")
})
app.use("/dashboard",(req,res)=>{
    res.send("hello for the route dashboard")
})
app.use("/home",(req,res)=>{
    res.send("hello for the route home")
})

app.use((req,res)=>{
    res.send("hello for the server")
})

app.listen(port, ()=>{
console.log("connted to the sever successfully")
})






