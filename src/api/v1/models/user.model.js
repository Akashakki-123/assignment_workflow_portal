import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  fullName:{ type: String, required:true },
  userName: { type:String, required:true, unique: true },
  email: { type: String, unique: true, required:true },
  password:{ type: String, required:true }, 
  role: { type: String, enum: ["teacher","student"], default: "student" },
  schemaVersion: { type: Number, default: 0 }
}, { timestamps: true });

const userModel = model("user", userSchema);
export default userModel;
