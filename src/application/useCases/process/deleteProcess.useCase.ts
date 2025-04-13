// application/usecases/process/DeleteProcessUseCase.ts
import { IProcessRepository } from '../../../domain';

export class DeleteProcessUseCase {
  constructor(private readonly repository: IProcessRepository) {}

  public async execute(id: string): Promise<boolean> {
    const exists = await this.repository.findById(id);
    
    if (!exists) {
      throw new Error('Proceso no encontrado');
    }
    
    return this.repository.delete(id);
  }
}