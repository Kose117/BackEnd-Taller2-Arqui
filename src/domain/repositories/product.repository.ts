import { Product } from '../entities/product.entity';
import { UpdateProductDto, ProductResponseDto } from '../../application';

export interface IProductRepository {
  findAll(): Promise<ProductResponseDto[]>;
  findById(id: string): Promise<ProductResponseDto | null>;
  create(data: Omit<Product, 'id'>): Promise<Product>;
  update(id: string, data: UpdateProductDto): Promise<ProductResponseDto | null>;
  delete(id: string): Promise<boolean>;
}