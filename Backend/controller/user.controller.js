import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//signup
export const signup = async (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  try {
    const { fname, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new User({
      fname,
      email,
      password: hashedPassword,
    });

    await createdUser.save();

    const token = jwt.sign(
      {
        id: createdUser._id,
        email: createdUser.email,
        role: createdUser.role, 
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User Created Successfully",
      token,
      user: {
        _id: createdUser._id,
        fname: createdUser.fname,
        email: createdUser.email,
        role: createdUser.role, 
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY || "Tocst0ZeOcsYKUffUpE0qQYB";
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, 
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        fname: user.fname,
        email: user.email,
        role: user.role, 
      },
    });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
