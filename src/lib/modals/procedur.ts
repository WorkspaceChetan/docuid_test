import { Schema, model, models } from "mongoose";
import User from "./user";
import Label from "./label";
const ProcedureSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String },
  user: { type: Schema.Types.ObjectId, ref: User.modelName },
  label: [{ type: Schema.Types.ObjectId, ref: Label.modelName }],
  column: { type: String },
  dueDate: { type: Date },
  createAt: { type: Date, default: Date.now },
});

const Procedure = models.Procedure || model("Procedure", ProcedureSchema);

export default Procedure;
