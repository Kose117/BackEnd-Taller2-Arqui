import { Type, Static } from '@sinclair/typebox';

export const CreateProductSchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  price: Type.Number(),
  category: Type.Optional(Type.String()),
  stock: Type.Optional(Type.Number()),
  createdAt: Type.Optional(Type.Date()),
  updatedAt: Type.Optional(Type.Date()),
});
export type CreateProductDto = Static<typeof CreateProductSchema>;


export const UpdateProductSchema = Type.Partial(CreateProductSchema);
export type UpdateProductDto = Static<typeof UpdateProductSchema>;

export const ProductResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  price: Type.Number(),
  category: Type.String(),
  stock: Type.Number(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});
export type ProductResponseDto = Static<typeof ProductResponseSchema>;


export const ProductsListSchema = Type.Object({
  products: Type.Array(ProductResponseSchema),
});
export type ProductsListDto = Static<typeof ProductsListSchema>;
