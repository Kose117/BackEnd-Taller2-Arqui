import bcrypt from 'bcryptjs';
import config from '../../../infrastructure/config';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { BaseUser } from '../../../domain/entities/user.entity';

export class CreateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(data: Omit<BaseUser, 'id'>): Promise<BaseUser> {
    const hashedPassword = await bcrypt.hash(data.password, config.jwt.saltRounds);
    data.password = hashedPassword;
    return this.userRepo.create(data);
  }
}
