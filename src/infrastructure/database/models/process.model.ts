// infrastructure/database/models/process.model.ts
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

// 1. Tipo del esquema
type ProcessSchemaType = InferSchemaType<typeof ProcessSchema>;

// 2. Interfaz del documento
export interface ProcessDocument extends ProcessSchemaType, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// 3. Tipo Lean personalizado
export type ProcessLean = Omit<ProcessDocument, keyof Document> & {
  _id: Types.ObjectId;
};

// 4. Exportar el modelo
export const Process = model<ProcessDocument>('Process', ProcessSchema);