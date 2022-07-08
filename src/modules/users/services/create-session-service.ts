import { AppError } from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { User } from '../typeorm/entities'
import { UsersRepository } from './../typeorm/repositories/users-repository'

interface IRequest {
  email: string
  password: string
}

export class CreateSessionService {
  async execute ({ email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository)

    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    return user
  }
}
