import { Router } from "express";
import { ProcessController } from "../../presentation";
import { ProcessRepository, ProductRepository } from "../../infrastructure";
import {
  CreateProcessUseCase,
  GetAllProcessesUseCase,
  GetProcessByIdUseCase,
  UpdateProcessUseCase,
  DeleteProcessUseCase,
  GetProcessesByUserUseCase,
} from "../../application";
import { validateRoleMiddleware } from "../middleware/jwtMiddleware";

const router = Router();

const processRepository = new ProcessRepository();
const productRepository = new ProductRepository();

const controller = new ProcessController(
  new CreateProcessUseCase(processRepository, productRepository),
  new GetAllProcessesUseCase(processRepository),
  new GetProcessByIdUseCase(processRepository),
  new GetProcessesByUserUseCase(processRepository),
  new UpdateProcessUseCase(processRepository),
  new DeleteProcessUseCase(processRepository),
);

router.post("/", validateRoleMiddleware(['OPERADOR', 'ADMIN']), controller.create);
router.get("/user/", validateRoleMiddleware(['OPERADOR', 'ADMIN']) ,controller.getByUser);
router.get("/", validateRoleMiddleware(['OPERADOR', 'ADMIN']) ,controller.getAll);
router.get("/:id", validateRoleMiddleware(['OPERADOR', 'ADMIN']), controller.getById);
router.patch("/:id", validateRoleMiddleware(['OPERADOR', 'ADMIN']), controller.update);
router.delete("/:id", validateRoleMiddleware(['OPERADOR', 'ADMIN']), controller.delete);

export default router;
