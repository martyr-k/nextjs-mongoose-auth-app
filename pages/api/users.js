import nc from "next-connect";

import dbConnect from "../../lib/dbConnect";
import User from "../../models/users";

const handler = nc();

handler.use(dbConnect).get(async (req, res) => {
  const users = await User.find();

  res.status(200).json({ status: "success", data: users });
});

export default handler;
