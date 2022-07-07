import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities'
import { ProductRepository } from './../typeorm/repositories/products-repository'

interface IRequest {
  name: string
  price: number
  quantity: number
}

export class CreateProductService {
  private productRepository = getCustomRepository(ProductRepository)

  async execute ({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await this.productRepository.findByName(name)

    if (productExists) {
      throw new AppError('Product already exists.', 400)
    }

    const product = this.productRepository.create({
      name,
      price,
      quantity
    })

    await this.productRepository.save(product)

    return product
  }
}
