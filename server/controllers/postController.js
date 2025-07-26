const postModel= require('../models/postModel')
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
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
        success:true,
        message:'Post Created Successfully!!',
        post
    })
    console.log(req)
    
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
const getAllPostController = ()=>{

}
module.exports = { createPostController, getAllPostController };
