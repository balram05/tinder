const mongoose = require("mongoose")
const connectDB = async()=>{
await mongoose.connect(
    "mongodb+srv://nodejs:2qnuxFMEZscdLoiI@learningnodejs.zr8sapl.mongodb.net/tinder")

}
module.exports = connectDB
