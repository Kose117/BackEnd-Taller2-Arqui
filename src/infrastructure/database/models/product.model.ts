import { Schema, model, Document, Types } from 'mongoose';

// Definir el documento con _id explícito
export interface ProductDocument extends Document {
  _id: Types.ObjectId; // ← Definir explícitamente el tipo
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Tipo Lean con _id como ObjectId
export type ProductLean = Omit<ProductDocument, keyof Document> & {
  _id: Types.ObjectId;
};

const ProductSchema = new Schema<ProductDocument>(
  {
    expirationDate: { 
      type: Date, 
      required: true,
      validate: {
        validator: (date: Date) => date > new Date(),
        message: "La fecha de vencimiento debe ser futura"
      }
    }
  },
  { timestamps: true }
);

export const Product = model<ProductDocument>('Product', ProductSchema);