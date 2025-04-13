// presentation/routes/product.router.ts
import { Router } from 'express';
import { ProductController } from '../../presentation';
import { ProductRepository } from '../../infrastructure';
import { 
  CreateProductUseCase,
  GetAllProductsUseCase,
  GetProductByIdUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '../../application';

const router = Router();
const repository = new ProductRepository();

// Inicializar casos de uso
const createUseCase = new CreateProductUseCase(repository);
const getAllUseCase = new GetAllProductsUseCase(repository);
const getByIdUseCase = new GetProductByIdUseCase(repository);
const updateUseCase = new UpdateProductUseCase(repository);
const deleteUseCase = new DeleteProductUseCase(repository);

// Inicializar controlador
const controller = new ProductController(
  createUseCase,
  getAllUseCase,
  getByIdUseCase,
  updateUseCase,
  deleteUseCase
);

// Configurar rutas
router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;