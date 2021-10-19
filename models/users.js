import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "This email address already exists, please choose another."],
    required: [true, "Please specify an email address."],
  },
  password: {
    type: String,
    required: [true, "Please specify a password."],
    select: false,
  },
  refreshToken: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  return next();
});

userSchema.methods.comparePassword = async (candidatePassword, userPassword) =>
  bcrypt.compare(candidatePassword, userPassword);

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    // - use different secret?
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  });

  this.refreshToken = token;
  return token;
};

// prevents mongoose from recompiling the model
export default mongoose.models.User || mongoose.model("User", userSchema);
