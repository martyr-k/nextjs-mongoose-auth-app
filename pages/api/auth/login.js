import nc from "next-connect";
import jwt from "jsonwebtoken";

import dbConnect from "../../lib/dbConnect";
import User from "../../models/users";

const handler = nc();

handler.use(dbConnect).post(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Missing credentials, please try again.");
  }

  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    console.log("Incorrect email or password, please try again.");
  }

  if (user && (await user.comparePassword(password, user.password))) {
    // - send jwt?
  }
});
