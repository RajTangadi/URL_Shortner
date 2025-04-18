import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide username, email and password",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User already exists", success: false });
  }

  // Hash the password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password,salt);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ message: "user created successfully", newUser, success: true });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found!"));

    // Check if password is correct
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // localStorage.setItem("token", token);
    // Remove password from user object
    const { password: pass, ...rest } = user._doc;

    // res
    //   .cookie("access_token", token, { httpOnly: true })
    //   .status(200)
    //   .json(rest);
    res.status(200).json({
      user: rest,
      token, 
    });
  } catch (error) {
    next(error);
  }
};

// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       const { password, ...rest } = user._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username:
//           req.body.name.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         avatar: req.body.photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password, ...rest } = newUser._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const logout = async (_, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out");
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  console.log("Received FormData:", req.body);
  console.log("req.file:", req.file); // Log file upload
  if (!req.user || req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.file?.path, //photo
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    console.log("succefully updated", updatedUser);

    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
