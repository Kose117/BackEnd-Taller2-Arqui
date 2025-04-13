import { IUserRepository } from '../../../domain';
import { UpdateUserDto, UserResponseDto } from '../../dtos';
import bcrypt from 'bcryptjs';
import config from '../../../infrastructure/config';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(id: string, data: UpdateUserDto): Promise<UserResponseDto | null> {
    // Hashear la nueva contraseña si viene en la actualización
    let updateData = { ...data };
    
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, config.jwt.saltRounds);
      updateData = { ...updateData, password: hashedPassword };
    }

    // Actualizar y obtener el usuario actualizado
    const updatedUser = await this.userRepository.update(id, updateData);
    
    if (!updatedUser) return null;

    // Eliminar campos sensibles de la respuesta
    const safeUserData = { ...updatedUser };
    
    return safeUserData;
  }
}