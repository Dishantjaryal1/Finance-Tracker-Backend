const mongoose = require('mongoose');
const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/expense')
            console.log("Connected!!!")
    } catch (error) {
        console.log("Not Connected!!")
    }
}
module.exports = connectDB