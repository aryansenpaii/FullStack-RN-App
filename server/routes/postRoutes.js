const express= require("express");
const { requireSignIn } = require("../controllers/userController");
const { createPostController, getAllPostController } = require("../controllers/postController");

//router object
const router= express.Router();

//CREATE POST (POST)
router.post('/create-post',requireSignIn,createPostController)

//GET ALL POSTS (GET)
router.post('/get-all-posts',getAllPostController)

//export
module.exports=router;