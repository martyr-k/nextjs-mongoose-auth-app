import nc from "next-connect";

import dbConnect from "lib/dbConnect";
import User from "models/users";
import { sendToken } from "utils/helpers";

const handler = nc();

handler.use(dbConnect).get(async (req, res) => {
  try {
    // 1) get refresh token from cookie header, if additional cookies will need to change
    const refreshToken = req.headers.cookie.split("=")[1];

    if (!refreshToken) {
      throw new Error("Access denied, unauthorized refresh token.");
    }

    // 2) verify refresh token using database, if not valid throw error
    const user = await User.findOne({ refreshToken });

    if (!user) {
      throw new Error("Access denied, user does not exist.");
    }

    sendToken(200, user, req, res);
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
});

export default handler;
