// application/dtos/process.dto.ts
import { Type, Static } from '@sinclair/typebox';

export const ProcessStatusEnum = Type.Union([
  Type.Literal('OPERATING'),
  Type.Literal('SENT'),
  Type.Literal('DELIVERED'),
]);

export const CreateProcessSchema = Type.Object({
  startDate: Type.Date(),
  deliveryDate: Type.Date(),
  progressPercentage: Type.Number({ minimum: 0, maximum: 100 }),
  status: ProcessStatusEnum,
});
export type CreateProcessDto = Static<typeof CreateProcessSchema>;

export const UpdateProcessSchema = Type.Partial(CreateProcessSchema);
export type UpdateProcessDto = Static<typeof UpdateProcessSchema>;

export const ProcessResponseSchema = Type.Object({
  id: Type.String(),
  startDate: Type.Date(),
  deliveryDate: Type.Date(),
  progressPercentage: Type.Number(),
  status: ProcessStatusEnum,
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});
export type ProcessResponseDto = Static<typeof ProcessResponseSchema>;