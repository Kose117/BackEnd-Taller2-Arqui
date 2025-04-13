// application/usecases/product/DeleteProductUseCase.ts
import { IProductRepository } from '../../../domain';

export class DeleteProductUseCase {
  constructor(private readonly repository: IProductRepository) {}

  public async execute(id: string): Promise<boolean> {
    const exists = await this.repository.findById(id);
    
    if (!exists) {
      throw new Error('Producto no encontrado');
    }
    
    return this.repository.delete(id);
  }
}