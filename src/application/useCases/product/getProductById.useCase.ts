import { IProductRepository } from '../../../domain';
import { ProductResponseDto } from '../../dtos';

export class GetProductByIdUseCase {
  constructor(private readonly repository: IProductRepository) {}

  public async execute(id: string): Promise<ProductResponseDto | null> {
    const product = await this.repository.findById(id);
    
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    return product;
  }
}