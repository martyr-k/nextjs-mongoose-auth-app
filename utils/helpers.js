import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const sendToken = (statusCode, user, req, res) => {
  res.status(statusCode).json({
    status: "success",
    user: {
      email: user.email,
      token: generateToken(user._id),
    },
  });
};
