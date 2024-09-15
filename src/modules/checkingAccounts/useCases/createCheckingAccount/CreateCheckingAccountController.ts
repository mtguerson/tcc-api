import { Request, Response } from 'express'
import { CreateCheckingAccountUseCase } from './CreateCheckingAccountUseCase'
import { VerifyToken } from '../../../../middlewares/auth'

export class CreateCheckingAccountController {
  async handle(req: Request, res: Response) {
    const { name, account, agency, bank, balance, maintenanceFee } = req.body

    const user = await VerifyToken.handleFoundUser(req)

    if (!user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const createCheckingAccountUseCase = new CreateCheckingAccountUseCase()

    const result = await createCheckingAccountUseCase.execute({
      userId: user.userId,
      name,
      account,
      agency,
      bank,
      balance,
      maintenanceFee,
    })

    return res.status(201).json(result)
  }
}
