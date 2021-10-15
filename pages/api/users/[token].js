import nc from "next-connect";
import jwt from "jsonwebtoken";
const { promisify } = require("util");

import dbConnect from "lib/dbConnect";
import User from "models/users";

const handler = nc();

handler.use(dbConnect).get(async (req, res) => {
  try {
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
