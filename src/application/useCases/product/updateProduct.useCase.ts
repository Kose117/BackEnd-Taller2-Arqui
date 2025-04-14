import { IProductRepository } from '../../../domain';
import { UpdateProductDto, ProductResponseDto } from '../../dtos';

export class UpdateProductUseCase {
  constructor(private readonly repository: IProductRepository) {}

  public async execute(
    id: string,
    data: UpdateProductDto
  ): Promise<ProductResponseDto | null> {
    if (data.expirationDate && data.expirationDate <= new Date()) {
      throw new Error('La fecha de vencimiento debe ser futura');
    }

    return this.repository.update(id, data);
  }
}