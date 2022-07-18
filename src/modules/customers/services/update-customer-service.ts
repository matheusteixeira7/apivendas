import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { Customer } from '../typeorm/entities/customer'
import { CustomersRepository } from '../typeorm/repositories'

interface IRequest {
  customerId: string
  name: string
  email: string
}

export class UpdateCustomerService {
  async execute ({ customerId, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository)
    const customer = await customersRepository.findById(customerId)

    if (!customer) {
      throw new AppError('Customer not found')
    }

    const customerEmailExists = await customersRepository.findByEmail(email)

    if (customerEmailExists && customerEmailExists.id !== customerId) {
      throw new AppError('Email already in use')
    }

    customer.name = name
    customer.email = email

    await customersRepository.save(customer)

    return customer
  }
}
