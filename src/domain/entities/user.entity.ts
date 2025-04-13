// domain/entities/user.entity.ts
export interface BaseUser {
  id: string;
  email: string;
  password: string;
}

export type User = BaseUser;