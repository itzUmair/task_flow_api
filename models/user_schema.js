import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, maxLength: 9, required: true },
    first_name: { type: String, maxLength: 20, required: true },
    last_name: { type: String, maxLength: 20, required: true },
    bio: { type: String, maxLength: 200 },
    occupation: { type: String, maxLength: 20, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: users }
);

const userModel = mongoose.model("userSchema", userSchema);

export default userModel;
