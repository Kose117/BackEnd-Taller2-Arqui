// domain/entities/product.entity.ts
export interface BaseProduct {
    id: string;
    expirationDate: Date;
  }
  
  export type Product = BaseProduct;