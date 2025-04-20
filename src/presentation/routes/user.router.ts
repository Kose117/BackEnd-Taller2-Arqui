import { Router } from 'express';
import { UserController } from '../../presentation';
import { UserRepository } from '../../infrastructure/database/repositories';
import {
  CreateOperatorUseCase,
  CreateAdminUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../application';


const router = Router();

const userRepository = new UserRepository();

const createOperatorUseCase = new CreateOperatorUseCase(userRepository);
const createAdminUseCase = new CreateAdminUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController(
  createOperatorUseCase,
  createAdminUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
);

router.get('/', userController.getAll);
router.post('/operador', userController.createOperator);
router.post('/admin', userController.createAdmin);
router.get('/:id', userController.getById);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
