import mongoose, { Schema, Document, Model } from "mongoose";
import { Step1Question, Step2Question } from "@/lib/types";

// MongoDB document interface extending the base interface
export interface Step1QuestionDocument extends Step1Question, Document {
  createdAt: Date;
  updatedAt: Date;
}

// MongoDB schema definition
export const Step1QuestionSchema = new Schema<Step1QuestionDocument>(
  {
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
      index: true,
    },
    subtopic: {
      type: String,
      required: [true, "Subtopic is required"],
      trim: true,
      index: true,
    },
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    choices: {
      type: [String],
      required: [true, "Choices are required"],
      validate: {
        validator: function (v: string[]) {
          return v && v.length >= 2;
        },
        message: "At least 2 choices are required",
      },
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
    explanation: {
      type: String,
      required: [true, "Explanation is required"],
      trim: true,
    },
    source: {
      type: String,
      required: [true, "Source is required"],
      trim: true,
    },
    created_at: {
      type: String,
      required: [true, "Created at is required"],
    },
    embedding: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "qbanks",
  }
);

// Compound indexes for better query performance
// Step1QuestionSchema.index({ topic: 1, subtopic: 1 });
// Step1QuestionSchema.index({ topic: 1, createdAt: -1 });

// Create and export the model
export const Step1QuestionModel: Model<Step1QuestionDocument> =
  mongoose.models.step1questions ||
  mongoose.model<Step1QuestionDocument>("step1questions", Step1QuestionSchema);

export default Step1QuestionModel;
