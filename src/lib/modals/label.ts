import { Schema, model, models } from "mongoose";

const LabelSchema = new Schema({
  labelName: { type: String, required: true },
});

const Label = models.Label || model("Label", LabelSchema);

export default Label;
