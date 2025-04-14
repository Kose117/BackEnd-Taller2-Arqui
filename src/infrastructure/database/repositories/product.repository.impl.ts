import { Product as ProductModel, ProductLean } from '../models/product.model';
import { Product, IProductRepository } from '../../../domain';
import { UpdateProductDto, ProductResponseDto } from '../../../application';


export class ProductRepository implements IProductRepository {
  public async findAll(): Promise<ProductResponseDto[]> {
    const products = await ProductModel.find().lean<ProductLean[]>();
    return products.map(product => this.toResponseDto(product));
  }

  public async findById(id: string): Promise<ProductResponseDto | null> {
    const product = await ProductModel.findById(id).lean<ProductLean>();
    return product ? this.toResponseDto(product) : null;
  }

  public async create(data: Omit<Product, 'id'>): Promise<Product> {
    const product = await ProductModel.create(data);
    const productLean: ProductLean = {
      _id: product._id,
      expirationDate: product.expirationDate,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };

    return this.toDomainEntity(productLean);
  }

  public async update(
    id: string,
    data: UpdateProductDto
  ): Promise<ProductResponseDto | null> {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      data,
      { 
        new: true,
        runValidators: true 
      }
    ).lean<ProductLean>();

    return product ? this.toResponseDto(product) : null;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  }

  private toResponseDto(product: ProductLean): ProductResponseDto {
    return {
      id: product._id.toHexString(), 
      expirationDate: product.expirationDate,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };
  }

  private toDomainEntity(product: ProductLean): Product {
    return {
      id: product._id.toHexString(), 
      expirationDate: product.expirationDate,
    };
  }
}