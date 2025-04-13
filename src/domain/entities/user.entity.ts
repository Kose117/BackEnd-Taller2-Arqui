// domain/entities/user.entity.ts
export interface BaseUser {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type User = BaseUser;