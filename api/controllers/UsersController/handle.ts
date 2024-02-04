import bcrypt from "bcrypt"
import { usersRepository } from "./repository"
import { TCreateUser } from "./types"

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
}

export const usersHandle = new UsersHandle()
