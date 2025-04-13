import { Schema, model, Document, Types, InferSchemaType } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// Tipos derivados del esquema
type UserSchemaType = InferSchemaType<typeof UserSchema>;
export interface UserDocument extends UserSchemaType, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Tipo Lean explícito
export type UserLean = Omit<UserDocument, keyof Document> & {
  _id: Types.ObjectId;
};

export const User = model<UserDocument>('User', UserSchema);
