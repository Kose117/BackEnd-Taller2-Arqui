import { Type, Static } from '@sinclair/typebox';

export const ProcessStatusSchema = Type.Union([
  Type.Literal('OPERATING'),
  Type.Literal('SENT'),
  Type.Literal('DELIVERED'),
], {
  description: 'Possible statuses for a process'
});

export const CreateProcessSchema = Type.Object({
  startDate: Type.Optional(Type.Date()),
  deliveryDate: Type.Optional(Type.Date()),
  progressPercentage: Type.Optional(Type.Number()),
  status: Type.Optional(ProcessStatusSchema),
  createdAt: Type.Optional(Type.Date()),
  updatedAt: Type.Optional(Type.Date()),
});

export type CreateProcessDto = Static<typeof CreateProcessSchema>;
export const UpdateProcessSchema = Type.Partial(CreateProcessSchema);
export type UpdateProcessDto = Static<typeof UpdateProcessSchema>;


export const ProcessResponseSchema = Type.Object({
  id: Type.String(),
  startDate: Type.Date(),
  deliveryDate: Type.Date(),
  progressPercentage: Type.Number(),
  status: ProcessStatusSchema,
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});

export type ProcessResponseDto = Static<typeof ProcessResponseSchema>;

export const ProcessesListSchema = Type.Object({
  processes: Type.Array(ProcessResponseSchema),
});
export type ProcessesListDto = Static<typeof ProcessesListSchema>;
