// application/usecases/process/CreateProcessUseCase.ts
import { Process, IProcessRepository } from '../../../domain';
import { CreateProcessDto } from '../../dtos';

export class CreateProcessUseCase {
  constructor(private readonly repository: IProcessRepository) {}

  public async execute(data: CreateProcessDto): Promise<Process> {
    // Validación adicional si es necesaria (ej: fechas coherentes)
    if (data.deliveryDate < data.startDate) {
      throw new Error('La fecha de entrega no puede ser anterior a la de inicio');
    }

    return this.repository.create(data);
  }
}