import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities'
import { ProductRepository } from '../typeorm/repositories/products-repository'

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}

export class UpdateProductService {
  private productRepository = getCustomRepository(ProductRepository)

  async execute ({ id, name, price, quantity }: IRequest): Promise<Product> {
    const product = await this.productRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found', 404)
    }

    const productExists = await this.productRepository.findByName(name)

    if (productExists && name !== product.name) {
      throw new AppError('Product already exists.', 400)
    }

    Object.assign(product, { name, price, quantity })

    await this.productRepository.save(product)

    return product
  }
}
