import { Request, Response } from 'express'
import { CreateProductService, DeleteProductService, GetAllProductsService, GetProductService, UpdateProductService } from '../services'

export class ProductsController {
  private getAllProducts = new GetAllProductsService()
  private getProduct = new GetProductService()
  private createProduct = new CreateProductService()
  private updateProduct = new UpdateProductService()
  private deleteProduct = new DeleteProductService()

  async getAll (request: Request, response: Response): Promise<Response> {
    const products = await this.getAllProducts.execute()

    return response.status(200).json(products)
  }

  async getById (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const product = await this.getProduct.execute({ id })

    return response.status(200).json(product)
  }

  async create (request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body

    const product = await this.createProduct.execute({ name, price, quantity })

    return response.status(201).json(product)
  }

  async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, price, quantity } = request.body

    const product = await this.updateProduct.execute({ id, name, price, quantity })

    return response.status(201).json(product)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    await this.deleteProduct.execute({ id })

    return response.status(204).send()
  }
}
