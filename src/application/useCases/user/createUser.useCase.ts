// application/useCases/create-usuario.usecase.ts
import { CreateUserDto } from '../../../application';
import { IUserRepository, User } from '../../../domain';

export class CreateUserUseCase {
  constructor(private readonly usuarioRepository: IUserRepository) {}

  public async execute(data: CreateUserDto): Promise<User> {
    return this.usuarioRepository.create(data);
  }
}
