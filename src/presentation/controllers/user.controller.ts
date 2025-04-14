import { Request, Response, NextFunction } from "express";
import {
  CreateUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from "../../application";
import { CreateUserDto, UpdateUserDto } from "../../application/dtos";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("Creating user with data:", req.body);
      const newUser = await this.createUserUseCase.execute(
        req.body as CreateUserDto
      );
      res.status(201).json(newUser);
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
      const users = await this.getAllUsersUseCase.execute();
      res.status(200).json(users);
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
      const user = await this.getUserByIdUseCase.execute(id);
      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: "User not found" });
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
      const updatedUser = await this.updateUserUseCase.execute(
        id,
        req.body as UpdateUserDto
      );
      updatedUser
        ? res.status(200).json(updatedUser)
        : res.status(404).json({ message: "User not found" });
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
      const success = await this.deleteUserUseCase.execute(id);
      success
        ? res.status(200).json({ message: "User deleted" })
        : res.status(404).json({ message: "User not found" });
    } catch (error) {
      next(error);
    }
  };
}