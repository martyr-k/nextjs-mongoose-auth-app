import nc from "next-connect";

import dbConnect from "lib/dbConnect";
import { parseCookies } from "utils/helpers";

const handler = nc();

handler.use(dbConnect).post((req, res) => {
  try {
    // 1) get refresh token from cookie header
    const { refreshToken } = parseCookies(req);

    if (!refreshToken) {
      throw new Error("An error occurred, you are already signed out.");
    }

    res.setHeader(
      "Set-Cookie",
      `refreshToken=""; HttpOnly; Expires=${new Date(0)}`
    );
    res.status(204).json();
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
});

export default handler;
