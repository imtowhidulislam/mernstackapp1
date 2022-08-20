import userDB from "../models/userModels.js";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import "dotenv/config";
import {
  loginAuthentication,
  signupAuthentication,
} from "../validation/userValidataion.js";

// ? GetallUser :::
export const allUsers = async (req, res, next) => {
  try {
    const users = await userDB.find().sort({ createdAt: -1 });
    res.status(200).json(users);
    next();
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
// ? Get Single User :::
export const singleUsers = async (req, res, next) => {
  const { Id } = req.params;
  try {
    const users = await userDB.findOne({ _id: Id });
    res.status(200).json(users);
    next();
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
// ? Update an exsiting User:::
export const updateUsers = async (req, res, next) => {
  const { Id } = req.params;
  const data = req.body;
  try {
    const users = await userDB.findOneAndUpdate({ _id: Id }, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(users);
    next();
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
// ! Delete single User :::
export const deleteUsers = async (req, res, next) => {
  const { Id } = req.params;
  try {
    const users = await userDB.findOneAndDelete({ _id: Id });
    res.status(200).json(users);
    next();
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// ? User SingUp :::
// ! Creating Token for authentication:::
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
};
export const SignUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (!email || !password || !userName) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough");
    }

    // ! Validate if the use is already exist in our database or not?
    const findUser = await userDB.findOne({ email });
    if (findUser) {
      return res.status(409).send("Email already exist");
    } else {
      const salt = await bcript.genSalt(10);
      const hashingPassword = await bcript.hash(password, salt);

      // console.log(token);
      // ! Creating User User:::
      const newUser = new userDB({
        userName,
        email: email.toLowerCase(),
        password: hashingPassword,
      });

      // ? Creating Token:::
      const token = createToken(newUser._id);
      // newUser.token = token;

      await newUser.save();
      res.status(200).json({ newUser, token });
      // next();
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ? User Login :::
export const Login = async (req, res, next) => {
  try {
    // const { error } = loginAuthentication(req.body);
    const { email, password } = req.body;
    const user = await userDB.findOne({ email: email });

    if (!email || !password) {
      throw Error("All fields must be field");
    }

    if (!user) res.status(401).send("Email doesn't exist");

    const matchPass = await bcript.compare(password, user.password);
    if (!matchPass) {
      throw Error("Invalid Password");
    }

    // !! Create Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });
    res.header("auth-token", token).json({ email, token });
    // const token = createToken(user._id);

    res.status(200).json({ user: "Exist" });
    next();
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
