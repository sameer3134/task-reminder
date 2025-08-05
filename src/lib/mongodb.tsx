import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};


const MONGODB_URI = process.env.MONGODB_URI!;
const globalWithMongoose = global as typeof global & { mongoose: MongooseCache };

const cached = globalWithMongoose.mongoose || { conn: null, promise: null };
globalWithMongoose.mongoose = cached;


export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
