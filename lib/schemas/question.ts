import mongoose, { Schema, Document, Model } from "mongoose";
import { QbankQuestion } from "@/types";

// MongoDB document interface extending the base interface
export interface QbankQuestionDocument extends QbankQuestion, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

// MongoDB schema definition
const QbankQuestionSchema = new Schema<QbankQuestionDocument>(
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
QbankQuestionSchema.index({ topic: 1, subtopic: 1 });
QbankQuestionSchema.index({ topic: 1, createdAt: -1 });

// Create and export the model
export const QbankQuestionModel: Model<QbankQuestionDocument> =
  mongoose.models.qbanks ||
  mongoose.model<QbankQuestionDocument>("qbanks", QbankQuestionSchema);

export default QbankQuestionModel;
