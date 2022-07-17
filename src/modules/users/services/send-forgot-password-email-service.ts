import { EtherealMail } from '@config/mail'
import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { UsersRepository, UserTokensRepository } from '../typeorm/repositories/'

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

    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida. ${userToken?.token}`
    })
  }
}
