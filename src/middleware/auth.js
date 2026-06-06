const adminAuth = ("/admin",(res, req, next) => {
    const token = "abc"
    const authToken = token === "abc";
    if (!authToken) {
        res.status(401).send("unauthorized")
    }
    else {
        next()
    }
})
module.exports ={
    adminAuth
}