const express= require('express')
const cors = require('cors')
const dotenv= require('dotenv')
const colors= require('colors')
const morgan= require('morgan')
const connectDB = require('./config/db')

//DOTENV
dotenv.config()

//REST OBJECT
const app= express()

//MONGODB
connectDB();

//middleware
app.use(cors())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
//ROUTES
app.use("/api/v1/auth", require("./routes/userRoutes"))
app.use("/api/v1/post",require("./routes/postRoutes"))

//PORT
const PORT= process.env.PORT || 8080

//LISTENING
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`.bgCyan.white);
})