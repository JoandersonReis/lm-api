import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import { usersRepository } from "./repository"
import { TCreateUser, TLogin } from "./types"

class UsersHandle {
  public async create(data: TCreateUser) {
    const rounds = 10
    const salt = bcrypt.genSaltSync(rounds)
    const hash = bcrypt.hashSync(data.password, salt)

    const result = await usersRepository.create({
      ...data,
      password: hash,
    })

    return result
  }

  public async login(data: TLogin) {
    const user = await usersRepository.verify(data)

    if (!user) {
      return {
        return: false,
        status: 500,
        message: "Usuário ou senha inválidos",
      }
    }

    const verify = bcrypt.compareSync(data.password, user.password)

    if (!verify) {
      return {
        return: false,
        status: 400,
        message: "Senha inválida!",
      }
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
        },
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "365d",
        subject: user.id,
      }
    )

    return {
      status: 200,
      message: "Logado com sucesso!",
      data: {
        token,
        username: user.username,
        name: user.name,
      },
    }
  }
}

export const usersHandle = new UsersHandle()
