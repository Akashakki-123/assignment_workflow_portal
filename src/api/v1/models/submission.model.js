import { model, Schema } from "mongoose";

const submissionSchema = new Schema({
  assignmentId: { type: Schema.Types.ObjectId, ref: "assignment", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  answer: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  reviewed: { type: Boolean, default: false }
}, { timestamps: true });

submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true }); // one submission per student per assignment

const submissionModel = model("submission", submissionSchema);
export default submissionModel;
