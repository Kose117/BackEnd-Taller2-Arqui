import { Router } from 'express';
import { ProductController } from '../../presentation';
import { ProductRepository } from '../../infrastructure';
import { 
  CreateProductUseCase,
  GetAllProductsUseCase,
  GetProductByIdUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  GetProductsByUserUseCase,
} from '../../application';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';

const router = Router();
const repository = new ProductRepository();

const createUseCase = new CreateProductUseCase(repository);
const getAllUseCase = new GetAllProductsUseCase(repository);
const getByIdUseCase = new GetProductByIdUseCase(repository);
const updateUseCase = new UpdateProductUseCase(repository);
const deleteUseCase = new DeleteProductUseCase(repository);
const getByUserUseCase = new GetProductsByUserUseCase(repository);

const controller = new ProductController(
  createUseCase,
  getAllUseCase,
  getByIdUseCase,
  updateUseCase,
  deleteUseCase,
  getByUserUseCase

);

router.post('/', validateRoleMiddleware(['OPERADOR', 'ADMIN']) ,controller.create);
router.get('/user',validateRoleMiddleware(['OPERADOR', 'ADMIN']), controller.getByUser);
router.get('/', validateRoleMiddleware(['OPERADOR', 'ADMIN']) ,controller.getAll);
router.get('/:id', validateRoleMiddleware(['OPERADOR', 'ADMIN']),controller.getById);
router.patch('/:id',validateRoleMiddleware(['OPERADOR', 'ADMIN']), controller.update);
router.delete('/:id',validateRoleMiddleware(['OPERADOR', 'ADMIN']), controller.delete);

export default router;