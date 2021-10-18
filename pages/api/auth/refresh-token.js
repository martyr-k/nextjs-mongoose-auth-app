import nc from "next-connect";

import dbConnect from "lib/dbConnect";
import User from "models/users";
import { sendToken, parseCookies } from "utils/helpers";

const handler = nc();

handler.use(dbConnect).get(async (req, res) => {
  try {
    // 1) get refresh token from cookie header
    const { refreshToken } = parseCookies(req);

    if (!refreshToken) {
      throw new Error(
        "An error occured, please log-in to confirm your indentity."
      );
    }

    // 2) verify refresh token using database, if not valid throw error
    const user = await User.findOne({ refreshToken });

    if (!user) {
      throw new Error(
        "An error occured, please log-in to confirm your indentity."
      );
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
