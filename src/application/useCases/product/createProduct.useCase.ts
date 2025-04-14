import { Product, IProductRepository } from '../../../domain';
import { CreateProductDto } from '../../dtos';

export class CreateProductUseCase {
  constructor(private readonly repository: IProductRepository) {}

  public async execute(data: CreateProductDto): Promise<Product> {
    if (data.expirationDate <= new Date()) {
      throw new Error('La fecha de vencimiento debe ser futura');
    }

    return this.repository.create(data);
  }
}