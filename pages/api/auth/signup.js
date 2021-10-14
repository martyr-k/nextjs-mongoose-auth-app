import nc from "next-connect";
import jwt from "jsonwebtoken";

import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/users";

const generateJWT = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const handler = nc();

handler.use(dbConnect).post(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide an email address and/or password.");
    }

    const user = await User.create({
      email,
      password,
    });

    res.status(201).json({
      status: "success",
      data: {
        ...user,
        token: generateJWT(user._id),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      data: {
        message: error.message,
      },
    });
  }
});

export default handler;
