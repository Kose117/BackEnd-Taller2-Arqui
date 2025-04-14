import { CreateUserDto } from '../../../application';
import { IUserRepository, User } from '../../../domain';
import bcrypt from 'bcryptjs';
import config from '../../../infrastructure/config';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, config.jwt.saltRounds);

    const userWithHashedPassword: CreateUserDto = {
      ...data,
      password: hashedPassword,
    };

    return this.userRepository.create(userWithHashedPassword);
  }
}
