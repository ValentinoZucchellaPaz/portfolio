import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

/**
 * Mantener la conexión para evitar reconexiones repetidas en Next.js dev y SSR
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // espera hasta 15s
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!, opts)
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  console.log("✅ Connected to MongoDB");
  return cached.conn;
}
