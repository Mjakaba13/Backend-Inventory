import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { hashPassword, comparePassword } from "../auth/auth.js";
import "dotenv/config";
import { responseHandler } from "../auth/reponses.js";

//POST REQUESTS
//CREATE USER

export const createUser = async (req, res) => {
  try {
    const { fullName, email, shopName, password } = req.body;
    const { salt, hash } = await hashPassword(password);
    const user = await User.create({
      fullName: fullName,
      email,
      shopName,
      password: hash,
      salt,
      products: [],
    });
    return responseHandler(res, `success ${user.fullName} created`, 201, user);
  } catch (error) {
    return responseHandler(
      res,
      "E-mail is already taken, try another",
      400,
      error
    );
  }
};

//UPDATE USER
export const updateUser = async (req, res) => {
  const { _id, ...updateObject } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, updateObject);
    return responseHandler(
      res,
      "Your details have been updated successfully",
      201,
      updatedUser
    );
  } catch (error) {
    return responseHandler(res, "Something went wrong", 400, error);
  }
};

//DELETE USER
export const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return responseHandler(res, "User deleted", 200, deletedUser);
  } catch (error) {
    return responseHandler(res, "Something went wrong", 400, error);
  }
};

//GET SINGLE USER
export const getUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    return responseHandler(res, "User retrieved", 200, user);
  } catch (error) {
    return responseHandler(res, "Something went wrong", 400, error);
  }
};

//GET REQUESTS
//GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return responseHandler(res, "Users retrieved", 200, users);
  } catch (error) {
    return responseHandler(res, "Something went wrong", 400, error);
  }
};

//LOGIN
export const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).send({
        message: "Wrong email or password",
        data: null,
      });
    } else {
      const validPass = await comparePassword(userPassword, user.password);
      if (!validPass) {
        return responseHandler(res, "Wrong email or password", 400, null);
      }

      const { _id, fullName, email, shopName } = user;
      const token = jwt.sign(
        { _id, fullName, email, shopName },
        process.env.JWT_SEC,
        { expiresIn: "1hr" }
      );
      return res.header("X-auth-token", token).status(200).send({
        message: "User login successful",
        data: user,
      });
    }
  } catch (error) {
    return responseHandler(res, "Something went wrong", 400, error);
  }
};
