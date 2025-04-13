// domain/entities/process.entity.ts
export type ProcessStatus = 'OPERATING' | 'SENT' | 'DELIVERED';

export interface BaseProcess {
  id: string;
  startDate: Date;
  deliveryDate: Date;
  progressPercentage: number;
  status: ProcessStatus;
}

export type Process = BaseProcess;