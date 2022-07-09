import { AppError } from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm'
import { User } from '../typeorm/entities'
import { UsersRepository } from './../typeorm/repositories/users-repository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

export class CreateSessionService {
  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository)

    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const token = sign({}, '79dd44c92406bd7075f08987975c3010', {
      subject: user.id,
      expiresIn: '1d'
    })

    return { user, token }
  }
}
