import authConfig from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    verify(token, authConfig.jwt.secret)
    return next()
  } catch (err) {
    throw new AppError('Invalid JWT token')
  }
}
