import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

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
  role: {
    type: String,
    enum: ["user", "admin", "developer"],
    default: "user",
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
  const token = uuidv4();

  this.refreshToken = token;
  return token;
};

// prevents mongoose from recompiling the model
export default mongoose.models.User || mongoose.model("User", userSchema);
