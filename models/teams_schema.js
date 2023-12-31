import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    _id: { type: String, minlength: 6, maxLength: 6, required: true },
    name: { type: String, maxLength: 50, required: true },
    description: { type: String, maxLength: 200, required: false },
    members: [{ type: String, required: true, minlength: 6 }],
    badgeColor: { type: String, required: false },
    createdBy: { type: String, minlength: 6, maxLength: 6, required: true },
    tasks: [
      {
        _id: { type: String, minlength: 6, maxLength: 6, required: true },
        title: { type: String, maxLength: 100, required: true },
        description: { type: String, maxLength: 1000, required: true },
        priority: {
          type: String,
          enum: ["high", "low", "medium"],
          required: true,
        },
        deadline: { type: Date, required: true },
        state: {
          type: String,
          enum: ["complete", "pending", "working"],
          required: true,
        },
        completionDate: { type: Date },
        completedBy: { type: String },
        createdBy: { type: String, required: true },
        createdOn: { type: Date, required: true },
      },
    ],
    logs: [
      {
        message: { type: String, maxLength: 200, required: true },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { collection: "teams" }
);
const teamModel = mongoose.model("teamSchema", teamSchema);

export default teamModel;
