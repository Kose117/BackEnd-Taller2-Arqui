import { Schema, model, Document, Types, InferSchemaType } from 'mongoose';

const ProcessSchema = new Schema({
  startDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  progressPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['OPERATING', 'SENT', 'DELIVERED'],
    required: true
  }
}, { timestamps: true });

type ProcessSchemaType = InferSchemaType<typeof ProcessSchema>;

export interface ProcessDocument extends ProcessSchemaType, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type ProcessLean = Omit<ProcessDocument, keyof Document> & {
  _id: Types.ObjectId;
};

export const Process = model<ProcessDocument>('Process', ProcessSchema);