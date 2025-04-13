import { Type, Static } from '@sinclair/typebox';

export const CreateUserSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
  // createdAt: Type.Optional(Type.Date()),
  // updatedAt: Type.Optional(Type.Date()),
});
export type CreateUserDto = Static<typeof CreateUserSchema>;

export const UpdateUserSchema = Type.Partial(CreateUserSchema);
export type UpdateUserDto = Static<typeof UpdateUserSchema>;

export const UserResponseSchema = Type.Object({
  id: Type.String(),
  email: Type.String({ format: 'email' }),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});
export type UserResponseDto = Static<typeof UserResponseSchema>;

// Esquema para una lista de usuarios
export const UsersListSchema = Type.Object({
  users: Type.Array(UserResponseSchema),
});
export type UsersListDto = Static<typeof UsersListSchema>;
