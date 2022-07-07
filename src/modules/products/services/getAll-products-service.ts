import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities'
import { ProductRepository } from '../typeorm/repositories/products-repository'

export class GetAllProductsService {
  private productRepository = getCustomRepository(ProductRepository)

  async execute (): Promise<Product[]> {
    const products = await this.productRepository.find()

    return products
  }
}
