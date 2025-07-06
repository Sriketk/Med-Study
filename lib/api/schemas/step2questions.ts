import mongoose, { Schema, Document, Model } from "mongoose";
import { Step1Question, Step2Question } from "@/types";
import { Step1QuestionSchema } from "./question";

// MongoDB document interface extending the base interface
export interface Step2QuestionDocument extends Step2Question, Document {
  createdAt: Date;
  updatedAt: Date;
}

// MongoDB schema definition
const Step2QuestionSchema = new Schema();
Step2QuestionSchema.add(Step1QuestionSchema).add({
  baseQuestion: {
    type: String,
    required: [true, "Base question is required"],
    trim: true,
  },
  patientDetails: {
    type: Object,
    required: [true, "Patient details are required"],
  },
  entireQuestion: {
    type: String,
    required: [true, "Entire question is required"],
    trim: true,
  },
  shelfSubject: {
    type: String,
    required: [true, "Shelf subject is required"],
    trim: true,
  },
});

// // Compound indexes for better query performance
// Step2QuestionSchema.index({ topic: 1, subtopic: 1 });
// Step2QuestionSchema.index({ topic: 1, createdAt: -1 });

// Create and export the model
export const Step2QuestionModel: Model<Step2QuestionDocument> =
  mongoose.models.qbanks ||
  mongoose.model<Step2QuestionDocument>("qbanks", Step2QuestionSchema);

export default Step2QuestionModel;
