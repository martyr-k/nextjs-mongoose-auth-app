import nc from "next-connect";

import dbConnect from "../../lib/dbConnect";
import Code from "../../models/codes"; // - generic model, i.e. user

const handler = nc();

handler.use(dbConnect).post(async (req, res) => {
  // - check to ensure an email & password were entered

  const user = await Code.findOne({
    email: req.body.email,
  }).select("+inviteCode"); // - make more generic, e.g. password

  if (!user) {
    console.log("Incorrect email or password, please try again.");
  }

  if (
    user &&
    (await user.comparePassword(req.body.inviteCode, code.inviteCode))
  ) {
    // - send jwt?
  }
});
