import { User } from '../entities/user.entity';
import { UpdateUserDto, UserResponseDto } from '../../application';

export interface IUserRepository {
  findAll(): Promise<UserResponseDto[]>;
  findById(id: string): Promise<UserResponseDto | null>;
  create(data: Omit<User, 'id'> | { createdAt?: Date; updatedAt?: Date; }): Promise<User>  
  update(id: string, data: UpdateUserDto): Promise<UserResponseDto | null>;
  delete(id: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
}