const express= require("express");
const { requireSignIn } = require("../controllers/userController");
const { createPostController, getAllPostController, getUserPostsController, deletePostController, updatePostController } = require("../controllers/postController");

//router object
const router= express.Router();

//CREATE POST (POST)
router.post('/create-post',requireSignIn,createPostController)

//GET ALL POSTS (GET)
router.get('/get-all-posts',getAllPostController,)

//GET USER POSTS (GET)
router.get('/get-user-posts',requireSignIn,getUserPostsController)

//DELETE POST
router.delete('/delete-post/:id',requireSignIn,deletePostController)

//UPDATE POST
router.put("/update-post/:id",requireSignIn,updatePostController)

//export
module.exports=router;