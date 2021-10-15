import User from "../../../models/users";

export const secured = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    throw new Error("Please login to access this route.");
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const code = await Code.findById(decodedToken.id);
  if (!code) {
    return next(new OperationalError("Access denied, code does not exist."));
  }
};
