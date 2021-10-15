import nc from "next-connect";

import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/users";
import { generateJWT } from "../../../utils/helpers";

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
      user: {
        email,
        token: generateJWT(user._id),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
});

export default handler;
