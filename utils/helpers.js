import jwt from "jsonwebtoken";

import User from "models/users";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const generateRefreshToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    //- use different secret?
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  });

  const user = await User.findById(userId);
  user.refreshToken = token;
  await user.save();

  return token;
};

export const sendToken = async (statusCode, user, req, res) => {
  res.setHeader(
    "Set-Cookie",
    `refreshToken=${await generateRefreshToken(user._id)}; HttpOnly; ${
      process.env.NODE_ENV === "production" ? "Secure" : ""
    }; SameSite=Lax; Expires=${new Date(
      Date.now() + process.env.REFRESH_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    )}`
  );
  res.status(statusCode).json({
    status: "success",
    token: {
      value: generateToken(user._id),
      expiry: Date.now(),
    },
  });
};
