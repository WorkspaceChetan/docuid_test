import { Schema, model, models } from "mongoose";
import User from "./user";

const ProcedureSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  label: [{ type: Schema.Types.ObjectId, ref: "Label" }],
  column: { type: String },
  dueDate: { type: Date },
  createAt: { type: Date, default: Date.now },
});

const Procedure = models.Procedure || model("Procedure", ProcedureSchema);

export default Procedure;
