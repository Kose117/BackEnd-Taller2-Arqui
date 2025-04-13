// application/usecases/process/GetProcessByIdUseCase.ts
import { IProcessRepository } from '../../../domain';
import { ProcessResponseDto } from '../../dtos';

export class GetProcessByIdUseCase {
  constructor(private readonly repository: IProcessRepository) {}

  public async execute(id: string): Promise<ProcessResponseDto | null> {
    const process = await this.repository.findById(id);
    
    if (!process) {
      throw new Error('Proceso no encontrado');
    }
    
    return process;
  }
}