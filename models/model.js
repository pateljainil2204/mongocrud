import { Schema, model, Types } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    isCompleted: { type: Boolean, default: false },
    createdBy: {
      type: Types.ObjectId, require: true, ref: "auth"
    }
  },
  { timestamps: true }
);

export default model("Task", taskSchema);