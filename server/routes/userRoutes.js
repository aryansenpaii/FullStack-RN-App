const express= require("express")
const { registerController, loginController, updateUserController, requireSignIn } = require("../controllers/userController");

//router object
const router= express.Router()

//routes
    // REGISTER (POST)
    router.post("/register",registerController)
    // LOGIN (POST)
    router.post("/login",loginController)
    //UPDATE (PUT)
    router.put('/update-user',requireSignIn,updateUserController)//the order of parameters matter in this case because 'requireSignIn' is a middleware and must be in middle 

//export
module.exports=router