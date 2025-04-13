// application/usecases/product/GetAllProductsUseCase.ts
import { IProductRepository } from '../../../domain';
import { ProductResponseDto } from '../../dtos';

export class GetAllProductsUseCase {
  constructor(private readonly repository: IProductRepository) {}

  public async execute(): Promise<ProductResponseDto[]> {
    return this.repository.findAll();
  }
}