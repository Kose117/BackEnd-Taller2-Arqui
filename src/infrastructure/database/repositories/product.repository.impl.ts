// infrastructure/database/repositories/product.repository.ts
import { Product as ProductModel, ProductLean } from '../models/product.model';
import { Product, IProductRepository } from '../../../domain';
import { UpdateProductDto, ProductResponseDto } from '../../../application';


export class ProductRepository implements IProductRepository {
  // Obtener todos los productos
  public async findAll(): Promise<ProductResponseDto[]> {
    const products = await ProductModel.find().lean<ProductLean[]>();
    return products.map(product => this.toResponseDto(product));
  }

  // Obtener producto por ID
  public async findById(id: string): Promise<ProductResponseDto | null> {
    const product = await ProductModel.findById(id).lean<ProductLean>();
    return product ? this.toResponseDto(product) : null;
  }

  // Crear producto
  public async create(data: Omit<Product, 'id'>): Promise<Product> {
    const product = await ProductModel.create(data);
    // Convertir el documento a ProductLean manualmente
    const productLean: ProductLean = {
      _id: product._id,
      expirationDate: product.expirationDate,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };

    return this.toDomainEntity(productLean);
  }

  // Actualizar producto
  public async update(
    id: string,
    data: UpdateProductDto
  ): Promise<ProductResponseDto | null> {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      data,
      { 
        new: true,
        runValidators: true // Ejecuta validaciones del esquema
      }
    ).lean<ProductLean>();

    return product ? this.toResponseDto(product) : null;
  }

  // Eliminar producto
  public async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  }

  // ==================== HELPERS ====================
  // Convertir a DTO de respuesta (excluye campos internos)
  private toResponseDto(product: ProductLean): ProductResponseDto {
    return {
      id: product._id.toHexString(), // Convertir ObjectId a string
      expirationDate: product.expirationDate,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };
  }

  // Convertir a entidad de dominio
  private toDomainEntity(product: ProductLean): Product {
    return {
      id: product._id.toHexString(), // Conversión válida
      expirationDate: product.expirationDate,
    };
  }
}