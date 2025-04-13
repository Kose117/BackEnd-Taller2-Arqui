// infrastructure/database/repositories/user.repository.ts
import { User as UserModel, UserLean } from '../models/user.model';
import { User, IUserRepository } from '../../../domain';
import { UpdateUserDto, UserResponseDto } from '../../../application';

export class UserRepository implements IUserRepository {
  public async findAll(): Promise<UserResponseDto[]> {
    const users = await UserModel.find().lean<UserLean[]>();
    return users.map(user => this.toResponseDto(user));
  }

  public async findById(id: string): Promise<UserResponseDto | null> {
    const user = await UserModel.findById(id).lean<UserLean>();
    return user ? this.toResponseDto(user) : null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).lean<UserLean>();
    return user ? this.toDomainEntity(user) : null;
  }

  public async create(data: Omit<User, 'id'>): Promise<User> {
    const user = await UserModel.create(data);
    return this.toDomainEntity(user.toObject());
  }

  public async update(
    id: string,
    data: UpdateUserDto
  ): Promise<UserResponseDto | null> {
    const user = await UserModel.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    ).lean<UserLean>();

    return user ? this.toResponseDto(user) : null;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return !!result;
  }

  // Helpers de conversión de tipos
  private toResponseDto(user: UserLean): UserResponseDto {
    return {
      id: user._id.toHexString(), // Conversión segura a string
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  private toDomainEntity(user: UserLean): User {
    return {
      id: user._id.toHexString(),
      email: user.email,
      password: user.password, // Solo disponible en la entidad de dominio
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}