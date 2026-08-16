const userSchema = require("../models/user")
const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    try {

        // step:1 create token 

        const { token } = req.cookies

        if (!token) {
            res.status(400).send("token is invalid")
        }


        // step2: validate the token

        const decodeToken = await jwt.verify(token, "DEVELOPER@TINDER")
        const { _id } = decodeToken

        //step 3:find the user 
        const user = await userSchema.findById(_id)
        if (!user) {
            res.status(400).send("user not find")
        }

req.user=user
next()
    } catch (err) {
        res.status(400).send("ERROR " + err.message)
    }
}
module.exports = {
    userAuth,
}