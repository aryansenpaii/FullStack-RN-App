const postModel = require("../models/postModel");
//create post
const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    //validate
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All fields",
      });
    }
    //create and save post in database
    let post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    // This is the fix — populate user details
    post = await post.populate("postedBy", "_id name");
    res.status(201).send({
      success: true,
      message: "Post Created Successfully!!",
      post,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Post API",
      error,
    });
  }
};
//GET ALL POSTS CONTROLLER
const getAllPostController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Posts Data!",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GETALLPOSTS API",
      error,
    });
  }
};
//GET ALL 'USER' POSTS CONTROLLER
const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in user POST API",
      error,
    });
  }
};

//DELETE POSTS
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your post has been Deleted!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in DELETE POST API",
      error,
    });
  }
};

//UPDATE POST CONTROLLER
const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    //post find
    const post = await postModel.findById({ _id: req.params.id });
    //validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please provided title or description!",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success:true,
      message:"Post updated successfully!",
      updatedPost
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update post api",
      error,
    });
  }
};
module.exports = {
  createPostController,
  getAllPostController,
  getUserPostsController,
  deletePostController,
  updatePostController,
};
