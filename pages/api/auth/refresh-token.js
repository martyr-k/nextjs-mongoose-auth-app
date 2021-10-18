const { promisify } = require("util");
import nc from "next-connect";
import jwt from "jsonwebtoken";

import dbConnect from "lib/dbConnect";
import { sendToken } from "utils/helpers";

const handler = nc();

handler.use(dbConnect).get(async (req, res) => {
  try {
    // 1) get refresh tooken from cookie header
    const refreshToken = req.headers.cookie.split("=")[1];

    // 2) verify refresh token using jwt library, if not valid throw error
    await promisify(jwt.verify)(refreshToken, process.env.JWT_SECRET);

    // 3) send new jwt and refresh to client
    const { authorization: token } = req.headers;
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    sendToken(200, { _id: decodedToken.id }, req, res);
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
});

export default handler;
