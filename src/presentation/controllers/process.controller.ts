import { Request, Response, NextFunction } from 'express';
import {
  CreateProcessUseCase,
  GetAllProcessesUseCase,
  GetProcessByIdUseCase,
  UpdateProcessUseCase,
  DeleteProcessUseCase,
  CreateProcessDto, 
  UpdateProcessDto
} from '../../application';

export class ProcessController {
  constructor(
    private readonly createUseCase: CreateProcessUseCase,
    private readonly getAllUseCase: GetAllProcessesUseCase,
    private readonly getByIdUseCase: GetProcessByIdUseCase,
    private readonly updateUseCase: UpdateProcessUseCase,
    private readonly deleteUseCase: DeleteProcessUseCase
  ) {}

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newProcess = await this.createUseCase.execute(
        req.body as CreateProcessDto
      );
      res.status(201).json(newProcess);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const processes = await this.getAllUseCase.execute();
      res.status(200).json(processes);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const process = await this.getByIdUseCase.execute(id);
      
      process
        ? res.status(200).json(process)
        : res.status(404).json({ message: 'Process not found' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedProcess = await this.updateUseCase.execute(
        id,
        req.body as UpdateProcessDto
      );
      
      updatedProcess
        ? res.status(200).json(updatedProcess)
        : res.status(404).json({ message: 'Process not found' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const success = await this.deleteUseCase.execute(id);
      
      success
        ? res.status(200).json({ message: 'Process deleted successfully' })
        : res.status(404).json({ message: 'Process not found' });
    } catch (error) {
      next(error);
    }
  };
}