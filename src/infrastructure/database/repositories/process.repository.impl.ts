// infrastructure/database/repositories/process.repository.ts
import { ProcessLean, Process as ProcessModel } from '../models/process.model';
import { Process, IProcessRepository } from '../../../domain';
import { UpdateProcessDto, ProcessResponseDto } from '../../../application';

export class ProcessRepository implements IProcessRepository {
  public async findAll(): Promise<ProcessResponseDto[]> {
    const processes = await ProcessModel.find().lean();
    return processes.map(p => this.toResponseDto(p));
  }

  public async findById(id: string): Promise<ProcessResponseDto | null> {
    const process = await ProcessModel.findById(id).lean();
    return process ? this.toResponseDto(process) : null;
  }

  public async create(data: Omit<Process, 'id'>): Promise<Process> {
    const process = await ProcessModel.create(data);
    return this.toDomainEntity(process.toObject());
  }

  public async update(id: string, data: UpdateProcessDto): Promise<ProcessResponseDto | null> {
    const process = await ProcessModel.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    ).lean();
    
    return process ? this.toResponseDto(process) : null;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await ProcessModel.findByIdAndDelete(id);
    return !!result;
  }

  private toResponseDto(process: ProcessLean): ProcessResponseDto {
    return {
      id: process._id.toHexString(),
      startDate: process.startDate,
      deliveryDate: process.deliveryDate,
      progressPercentage: process.progressPercentage,
      status: process.status,
      createdAt: process.createdAt,
      updatedAt: process.updatedAt
    };
  }

  private toDomainEntity(process: ProcessLean): Process {
    return {
      id: process._id.toHexString(),
      ...process
    };
  }
}