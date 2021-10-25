import nc from "next-connect";

import dbConnect from "lib/dbConnect";
import { secured } from "lib/middleware";

const handler = nc();

handler.use(dbConnect, secured).get(async (req, res) => {
  try {
    res.status(200).json({ status: "success", user: req.user });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
});

export default handler;
