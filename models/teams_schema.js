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
        title: { type: String, maxLength: 100, required: true },
        description: { type: String, maxLength: 1000, required: true },
        priority: { type: String, maxLength: 6, required: true },
        deadline: { type: Date, required: true },
        state: { type: String, maxLength: 5, required: true },
        completionDate: { type: Date },
        completedBy: { type: String, required: true },
        createdBy: { type: String, required: true },
        createdOn: { type: Date, required: true },
      },
    ],
  },
  { collection: "teams" }
);
const teamModel = mongoose.model(teamSchema, teamSchema);

export default teamModel;
