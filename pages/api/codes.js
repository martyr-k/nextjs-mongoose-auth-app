import nc from "next-connect";

import dbConnect from "../../lib/dbConnect";
import Code from "../../models/codes";

const handler = nc();

handler.use(dbConnect).get(async (req, res) => {
  const guests = await Code.find();

  res.status(200).json({ status: "success", data: guests });
});

export default handler;
