// application/usecases/process/UpdateProcessUseCase.ts
import { IProcessRepository } from '../../../domain';
import { UpdateProcessDto, ProcessResponseDto } from '../../dtos';

export class UpdateProcessUseCase {
  constructor(private readonly repository: IProcessRepository) {}

  public async execute(
    id: string,
    data: UpdateProcessDto
  ): Promise<ProcessResponseDto | null> {
    // Validación de reglas de negocio
    if (data.progressPercentage && (data.progressPercentage < 0 || data.progressPercentage > 100)) {
      throw new Error('El porcentaje debe estar entre 0 y 100');
    }

    return this.repository.update(id, data);
  }
}