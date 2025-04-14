import { Router } from 'express';
import { ProcessController } from '../../presentation';
import { ProcessRepository } from '../../infrastructure';
import {
  CreateProcessUseCase,
  GetAllProcessesUseCase,
  GetProcessByIdUseCase,
  UpdateProcessUseCase,
  DeleteProcessUseCase
} from '../../application';

const router = Router();

const repository = new ProcessRepository();
const controller = new ProcessController(
  new CreateProcessUseCase(repository),
  new GetAllProcessesUseCase(repository),
  new GetProcessByIdUseCase(repository),
  new UpdateProcessUseCase(repository),
  new DeleteProcessUseCase(repository)
);

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;