// presentation/controllers/product.controller.ts
import { Request, Response, NextFunction } from 'express';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
  GetProductByIdUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '../../application';
import { CreateProductDto, UpdateProductDto } from '../../application/dtos';

export class ProductController {
  constructor(
    private readonly createUseCase: CreateProductUseCase,
    private readonly getAllUseCase: GetAllProductsUseCase,
    private readonly getByIdUseCase: GetProductByIdUseCase,
    private readonly updateUseCase: UpdateProductUseCase,
    private readonly deleteUseCase: DeleteProductUseCase
  ) {}

  /**
   * Crea un nuevo producto.
   */
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newProduct = await this.createUseCase.execute(
        req.body as CreateProductDto
      );
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Obtiene todos los productos.
   */
  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const products = await this.getAllUseCase.execute();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Obtiene un producto por su ID.
   */
  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.getByIdUseCase.execute(id);
      
      product
        ? res.status(200).json(product)
        : res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Actualiza un producto existente.
   */
  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedProduct = await this.updateUseCase.execute(
        id,
        req.body as UpdateProductDto
      );
      
      updatedProduct
        ? res.status(200).json(updatedProduct)
        : res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Elimina un producto existente.
   */
  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const success = await this.deleteUseCase.execute(id);
      
      success
        ? res.status(200).json({ message: 'Producto eliminado correctamente' })
        : res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
      next(error);
    }
  };
}