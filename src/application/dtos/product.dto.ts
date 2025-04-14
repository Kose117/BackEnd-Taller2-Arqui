import { Type, Static } from '@sinclair/typebox';

export const CreateProductSchema = Type.Object({
  expirationDate: Type.Date(),
});
export type CreateProductDto = Static<typeof CreateProductSchema>;

export const UpdateProductSchema = Type.Partial(CreateProductSchema);
export type UpdateProductDto = Static<typeof UpdateProductSchema>;

export const ProductResponseSchema = Type.Object({
  id: Type.String(),
  expirationDate: Type.Date(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});
export type ProductResponseDto = Static<typeof ProductResponseSchema>;