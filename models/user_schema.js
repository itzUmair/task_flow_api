import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, minLength: 6, maxLength: 6, required: true },
    first_name: { type: String, maxLength: 20, required: true },
    last_name: { type: String, maxLength: 20, required: true },
    bio: { type: String, maxLength: 200 },
    occupation: { type: String, maxLength: 50, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bagdeColor: { type: String, default: "#4DBB3B", required: true },
  },
  { collection: "users" }
);

const userModel = mongoose.model("userSchema", userSchema);

export default userModel;
