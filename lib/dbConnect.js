import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable!");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(req, res, next) {
  if (cached.conn) {
    return next();
  }

  if (!cached.promise) {
    try {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      cached.promise = await mongoose.connect(MONGODB_URI, options);
      console.log("Database connection successful...");
      return next();
    } catch (error) {
      console.log(
        "An error occured while establishing a connection to the database: ",
        error
      );
    }
  }

  cached.conn = await cached.promise;
  return next();
}

export default dbConnect;
