const { promisify } = require("util");
import jwt from "jsonwebtoken";

import User from "models/users";

export const isAuthenticated = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    throw new Error("Please login to access this page.");
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findById(decodedToken.id);
  if (!user) {
    throw new Error("Access denied, user does not exist.");
  }

  req.user = user;

  return next();
};
