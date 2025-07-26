const mongoose= require('mongoose')
const colors= require('colors')

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_ATLAS)
        console.log(`Connected To DATABASE ${mongoose.connection.host}`.bgGreen.white)
    }
    catch(error){
        console.log(`error in connection DB ${error}`.bgRed.white)
    }
}
module.exports=connectDB;