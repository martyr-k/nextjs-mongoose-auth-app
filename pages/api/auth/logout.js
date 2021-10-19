import nc from "next-connect";

import dbConnect from "lib/dbConnect";
import User from "models/users";
import { parseCookies } from "utils/helpers";

const handler = nc();

handler.use(dbConnect).delete(async (req, res) => {
  try {
    // 1) get refresh token from cookie header
    const { refreshToken } = parseCookies(req);

    if (!refreshToken) {
      throw new Error("An error occurred, you are already signed out.");
    }

    // 2) verify refresh token using database, if not valid throw error
    const user = await User.findOne({ refreshToken });

    if (!user) {
      throw new Error("An error occurred, you are already signed out.");
    }

    user.refreshToken = undefined;
    await user.save();

    res.status(204).json();
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
});

export default handler;
