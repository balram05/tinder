const express = require("express");

// const {adminAuth} = require("./middleware/auth") 

const connectDB = require("./config/database")

const userSchema = require("./models/user")

const { validationRules } = require("./utils/validations")

const bcrypt = require("bcrypt")

const cookieParser = require('cookie-parser')

const jwt = require('jsonwebtoken');

const {userAuth} = require("./middleware/auth")


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

// middleware for parsing the body od request for the client
app.use(express.json())

app.use(cookieParser())


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid user",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        // creating the token by using the jesonwebtoken package
        const token = await jwt.sign({ _id: user._id }, "DEVELOPER@TINDER")

        res.cookie("token", token)
        res.send("Login successfully");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

app.get("/profile", userAuth, async (req, res) => {
    // read the cookie for the server we should 
    // install the cookie parser and it is middele ware 
    try {

        const user = req.user
res.send(user)
    }
    catch (err) {
        res.status(400).send("ERROR " + err.message)
    }
})

// api for the user signup
app.post("/signup", async (req, res) => {


    try {
        // validationRules(req)

        const { firstName, lastName, email, password, gender } = req.body


        const hashpasword = await bcrypt.hash(password, 10)


        const user = new userSchema({
            firstName, lastName, email, password: hashpasword, gender
        })

        //validations run here befor saving the data 
        await user.save()
        // res.status(200).json({message:"user created sucessfully",
        //     data:user
        // })
        res.send("successfully created")
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
})

// api for getting the user
app.get("/user", async (req, res) => {
    const userEmail = req.body.email

    // try {
    //     console.log("email", userEmail)
    //     const user = await userSchema.find({ email: userEmail })
    //     if (user.length == 0) {
    //         res.status(404).send("user not found")
    //     } else {
    //         res.send(user)
    //     }

    // } catch (err) {
    //     res.status(404).send("user not found")
    // }

    try {
        const user = await userSchema.find({ email: userEmail })
        if (user.length == 0) {
            res.status(404).send("user not found")
        } else {
            res.send(user)
        }

    } catch (err) {
        res.status(404).send("user not found")
    }


})

app.get("/feed", async (req, res) => {

    try {
        const allUser = await userSchema.find({})
        res.send(allUser)

    } catch (err) {
        res.status(404).send("no user found")

    }
})

// thus is the api to find the user by using the mongoDB id
app.get("/find", async (req, res) => {
    const userId = req.body.id
    try {
        const userid = await userSchema.findById(userId)
        res.send(userid)
    } catch (err) {
        res.status(404).send("no user found")
    }
})


// this is the api for find by id and delete the user
app.delete("/user", async (req, res) => {
    const deleteUserId = req.body.id
    try {
        const deleteUser = await userSchema.findByIdAndDelete({ _id: deleteUserId })
        if (!deleteUser) {
            return res.status(404).send("user not found")
        }
        // res.send(deleteUser)
        res.status(200).json({
            message: "user deleted ",
            data: deleteUser
        })
    } catch (err) {
        res.status(404).send("invaid user id")
    }

})

// this is the api, for update the user by id

// app.patch("/user", async(req,res)=>{
//     const {id,...update} = req.body
//     try{

//        const allowUpdate =["gender","age","about","profileURL","skills"]
//         const upadateOnly = Object.keys(update).every((key)=>allowUpdate.includes(key))
//         // we can also write the above line as 
// //         let result = true;

// // const keys = Object.keys(update);

// // for (let i = 0; i < keys.length; i++) {

// //     const key = keys[i];

// //     if (!allowUpdate.includes(key)) {
// //         result = false;
// //         break;
// //     }
// // }

// // console.log(result);
//         if(!upadateOnly){
//             throw new Error("Update Error")
//         }
//         const userUpdate= await userSchema.findByIdAndUpdate(id,update,{runValidators:true})
//         res.send(userUpdate)

//     }catch(err){
//  res.status(404).send("user not found "+ err.message)
//     }
// })


// the same above api with the id as paramas
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId
    const update = req.body
    console.log(userId)
    try {

        const allowUpdate = ["gender", "age", "about", "profileURL", "skills"]
        const upadateOnly = Object.keys(update).every((key) => allowUpdate.includes(key))
        if (!upadateOnly) {
            throw new Error("Update Error")
        }
        if (update?.skills.length > 10) {
            throw new Error("can't have more then 10 skills")
        }
        const userUpdate = await userSchema.findByIdAndUpdate(userId, update, { runValidators: true })

        res.send(userUpdate)

    } catch (err) {
        res.status(404).send(err.message)
    }
})


//this is the api for upadate the user by email
app.patch("/userupdate", async (req, res) => {
    const { email, ...update } = req.body
    try {
        console.log(JSON.stringify(req.body))
        const user = await userSchema.findOneAndUpdate({ email }, update, { runValidators: true })
        if (!user) {
            res.status(404).send("invalid user")
        }
        res.send(user)

    } catch (err) {
        res.status(404).send("user not found")
    }
})



connectDB().then(() => {
    console.log("database is connected successfully")
    app.listen(port, () => {
        console.log("connted to the sever successfully")
    })
}).catch(err => {
    console.log("database is not connected", err.message)
})






