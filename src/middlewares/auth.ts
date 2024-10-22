import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { jwtInfo } from '../types/jwtInfo'

type CustomRequest = Request & {
  userInfo?: jwtInfo
}

export class VerifyToken {
  async handle(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ message: 'Token is required' })
    }

    verify(token, `${process.env.JWT_SECRET}`, (err, userInfo) => {
      if (err) {
        return res.status(401).json({ message: 'Token invalid' })
      }
      req.userInfo = userInfo as jwtInfo
    })

    next()
  }

  async handleAdmin(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ message: 'Token is required' })
    }

    verify(token, `${process.env.JWT_SECRET}`, (err, tokenInfo) => {
      const userInfo = tokenInfo as jwtInfo

      if (err) {
        return res.status(401).json({ message: 'Token invalid' })
      }

      if (!userInfo.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      req.userInfo = userInfo as jwtInfo
    })
    next()
  }

  static async handleFoundUser(req: CustomRequest) {
    return req.userInfo
  }
}
