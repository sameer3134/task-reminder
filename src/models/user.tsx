// models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: { 
    type: String, 
    unique: true, 
    required: true, 
    lowercase: true,
  },
  password: { 
    type: String, 
    required: true, 
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // store the URL or filename (e.g., from Cloudinary or your own uploads)
    default: "",  // optional
  }
});


const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
