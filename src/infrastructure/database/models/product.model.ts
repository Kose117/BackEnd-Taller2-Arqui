import { Schema, model, Document, Types } from 'mongoose';

export interface ProductDocument extends Document {
  _id: Types.ObjectId; 
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

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