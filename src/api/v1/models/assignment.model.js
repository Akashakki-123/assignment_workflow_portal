import { model, Schema } from "mongoose";

const assignmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["Draft", "Published", "Completed"], default: "Draft" },
  createdBy: { type: Schema.Types.ObjectId, ref: "user", required: true }
}, { timestamps: true });

const assignmentModel = model("assignment", assignmentSchema);
export default assignmentModel;
