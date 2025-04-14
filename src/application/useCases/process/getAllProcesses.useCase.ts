import { IProcessRepository } from '../../../domain';
import { ProcessResponseDto } from '../../dtos';

export class GetAllProcessesUseCase {
  constructor(private readonly repository: IProcessRepository) {}

  public async execute(): Promise<ProcessResponseDto[]> {
    return this.repository.findAll();
  }
}