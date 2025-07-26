const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt"); //jwt is a alias

//middleware
const requireSignIn = jwt({
  secret: process.env.JWT_TOKEN_KEY,
  algorithms: ["HS256"],
});

//----------REGISTRATION----------
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required!",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message:
          "please provide the password and should be atleast 6 character long",
      });
    }
    //check for existing user
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already exists with this email",
      });
    }

    //HASHING PASSWORD
    const hashedPassword = await hashPassword(password);

    //save user to DB
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Registration Successful please login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//----------LOGIN----------
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email or Password",
      });
    }
    //----------find_user-----------
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }
    //--------match_password---------
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    //Creating a JWT (json web token)
    //A JWT (JSON Web Token) is a safe way to share information between two parties (like a client and a server). It's mostly used for authentication — to prove who you are.

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_TOKEN_KEY, {
      expiresIn: "7d",
    });

    //set the password as undefined (security purpose) [should not be printed in console]
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "login successfully!",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login api",
      error,
    });
  }
};

//------------UPDATE USER---------
const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    //user finding
    const user = await userModel.findOne({ email });
    //password validation
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 characters long",
      });
    }
    //hashing the password
    const hashedPassword = password ? await hashPassword(password) : undefined;
    //updating the user
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    console.log(JSON.stringify(updatedUser));
    updatedUser.password = undefined; //to not show password in response
    res.status(200).send({
      success: true,
      message:
        "The User Profile has been successfully updated!! ....PLEASE LOGIN",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in User Update API",
      error,
    });
  }
};
module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUserController,
};
