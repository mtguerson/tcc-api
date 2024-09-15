import { User } from '@prisma/client'
import { prisma } from '../../../../prisma/client'
import { SignUpDto } from '../../dtos/signup'
import { AppError } from '../../../../errors/AppError'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtInfo } from '../../../../types/jwtInfo'

type CreateUserResponse = Partial<
  User & {
    accessToken?: string
  }
>

const defaultCategories = [
  'Salário',
  'Casa',
  'Alimentação',
  'Mercado',
  'Viagem',
]

export class CreateUserUseCase {
  async execute({
    name,
    username,
    email,
    password,
    phone,
  }: SignUpDto): Promise<CreateUserResponse> {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const phoneAlreadyTaken = await prisma.user.findUnique({
      where: {
        phone,
      },
    })

    if (phoneAlreadyTaken) {
      throw new AppError('Phone already taken')
    }

    const passwordSalt = Number(`${process.env.SALT_PASSWORD || 10}`)

    const salt = bcrypt.genSaltSync(passwordSalt)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        phone,
        categories: {
          create: defaultCategories.map((name) => ({ name })),
        },
      },
    })

    const jwtUserInfo: jwtInfo = {
      userId: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
    }

    const token = jwt.sign(jwtUserInfo, `${process.env.JWT_SECRET}`, {
      expiresIn: '1d',
    })

    return {
      email: user.email,
      name: user.name,
      username: user.username,
      phone: user.phone,
      accessToken: token,
    }
  }
}
