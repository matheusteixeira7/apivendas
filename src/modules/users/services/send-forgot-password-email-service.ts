import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../typeorm/repositories/users-repository'
import { UserTokensRepository } from './../typeorm/repositories/user-tokens-repository'

interface IRequest {
  email: string
}

export class SendForgotPasswordEmailService {
  async execute ({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository)
    const userTokensRepository = getCustomRepository(UserTokensRepository)

    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const userToken = await userTokensRepository.generate(user.id)

    console.log(userToken)
  }
}
