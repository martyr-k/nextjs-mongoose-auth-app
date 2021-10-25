import jwt from "jsonwebtoken";

import User from "models/users";

export const parseCookies = (req) => {
  const list = {};
  const rc = req.headers.cookie;

  rc &&
    rc.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      list[parts.shift().trim()] = decodeURI(parts.join("="));
    });

  return list;
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 60 * 1000,
  });
};

export const getRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const token = user.generateRefreshToken();
  await user.save();

  return token;
};

export const sendToken = async (statusCode, user, req, res) => {
  res.setHeader(
    "Set-Cookie",
    `refreshToken=${await getRefreshToken(user._id)}; HttpOnly; ${
      process.env.NODE_ENV === "production" ? "Secure" : ""
    }; SameSite=Lax; Expires=${new Date(
      Date.now() + process.env.REFRESH_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    )}`
  );
  res.status(statusCode).json({
    status: "success",
    token: {
      value: generateToken(user._id),
      expiry: Date.now() + process.env.JWT_EXPIRES_IN * 60 * 1000,
    },
  });
};
