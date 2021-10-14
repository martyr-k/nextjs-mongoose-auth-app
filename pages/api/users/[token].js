import nc from "next-connect";
import jwt from "jsonwebtoken";
const { promisify } = require("util");

import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/users";

const handler = nc();

handler.use(dbConnect).get(async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      throw new Error("Please login to access this route.");
    }

    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decodedToken.id);

    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
});

export default handler;
