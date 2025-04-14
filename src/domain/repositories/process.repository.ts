import { Process } from '../entities/process.entity';
import { UpdateProcessDto, ProcessResponseDto } from '../../application';

export interface IProcessRepository {
  findAll(): Promise<ProcessResponseDto[]>;
  findById(id: string): Promise<ProcessResponseDto | null>;
  create(data: Omit<Process, 'id' | 'createdAt' | 'updatedAt'>): Promise<Process>;
  update(id: string, data: UpdateProcessDto): Promise<ProcessResponseDto | null>;
  delete(id: string): Promise<boolean>;
}
